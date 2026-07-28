import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { RequestProcessor } from '../../server/services/request-processor';

const RequestPayloadSchema = z.object({
  CaptchaToken: z.string().optional(),
  Name: z.string().min(2),
  Service: z.string().min(1),
  ContactName: z.string().min(2),
  Email: z.string().email(),
  Address: z.string().min(5),
});

// Instantiate processor (or inject dependencies)
const processor = new RequestProcessor('CustomerService');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const validatedData = RequestPayloadSchema.parse(req.body);

     const params = new URLSearchParams({
      secret: process.env['reCaptchaToken']!,
      response: validatedData.CaptchaToken || '',
    });

    const googleResponse = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        body: params,
      }
    );

    const verification = await googleResponse.json();

    if (!verification.success) {
      return res.status(403).json({
        error: 'reCAPTCHA verification failed'
      });
    }

    // v3 only
    if (verification.score < 0.5) {
      return res.status(403).json({
        error: 'Low reCAPTCHA score'
      });
    }

    // Pass structured data to your backend class/module
    const result = await processor.process(validatedData);

    return res.status(200).json({ success: true, result });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, details: error.flatten().fieldErrors });
    }
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
