// src/app/core/projects/projects.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  id: string;
  ticket_number: number;
  service_desk_uuid: string;
  stage_id: number;
  contact_name: string;
  address: string;
  email: string | null;
  telephone_number: string;
  description: string | null;
  created_at: string;
}

export interface ProjectListResponse {
  projects: Project[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly http = inject(HttpClient);

  list(page = 1, limit = 20): Observable<ProjectListResponse> {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    return this.http.get<ProjectListResponse>(
      '/api/adminous/projects',
      {
        params,
        withCredentials: true
      }
    );
  }
}
