import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [NgFor],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = 'Klimanova';

  protected readonly stats = [
    { value: '12+', label: 'years of trusted service' },
    { value: '500+', label: 'completed installations' },
    { value: '4.9/5', label: 'average client rating' }
  ];

  protected readonly services = [
    {
      title: 'Air Conditioning',
      description: 'Efficient cooling systems for homes, offices, and retail spaces.',
      tag: 'Comfort & efficiency'
    },
    {
      title: 'Heating Systems',
      description: 'Reliable boilers, radiators, and underfloor heating for winter comfort.',
      tag: 'Warmth all season'
    },
    {
      title: 'Heat Pumps',
      description: 'Energy-saving heating and cooling with modern inverter technology.',
      tag: 'Lower energy bills'
    },
    {
      title: 'Ventilation',
      description: 'Balanced airflow and air quality solutions for healthier interiors.',
      tag: 'Clean indoor air'
    },
    {
      title: 'Smart Automation',
      description: 'Connected climate control that adapts to your schedule and preferences.',
      tag: 'Always in control'
    },
    {
      title: 'Maintenance & Repair',
      description: 'Fast support, inspections, and preventive care to keep systems reliable.',
      tag: 'Prevent downtime'
    }
  ];

  protected readonly projects = [
    {
      title: 'Family Villa Retrofit',
      location: 'Kyiv',
      description: 'Full heat pump and smart thermostat upgrade for year-round comfort.'
    },
    {
      title: 'Office Climate Upgrade',
      location: 'Lviv',
      description: 'Multi-zone air conditioning and ventilating system for improved productivity.'
    },
    {
      title: 'Restaurant Cooling System',
      location: 'Odesa',
      description: 'Energy-efficient cooling and air quality improvements for a busy kitchen.'
    }
  ];

  protected readonly reviews = [
    {
      quote: 'The team installed our heat pump quickly and explained every step clearly.',
      author: 'Olena K.'
    },
    {
      quote: 'Professional, punctual, and the system runs better than expected.',
      author: 'Yurii M.'
    },
    {
      quote: 'We finally have a comfortable office climate without surprise repair costs.',
      author: 'Natalia S.'
    }
  ];
}
