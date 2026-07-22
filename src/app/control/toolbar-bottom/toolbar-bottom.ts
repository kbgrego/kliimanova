import { Component, inject } from '@angular/core';
import { SettingsService } from '../../core/settings/settings.service';
import { PublicSettings } from '../../core/settings/public-settings';

@Component({
  selector: 'app-toolbar-bottom',
  imports: [],
  templateUrl: './toolbar-bottom.html',
  styleUrl: './toolbar-bottom.css',
})
export class ToolbarBottom {
  protected readonly settingsService = inject(SettingsService);

  readonly settingsGlob = this.settingsService.settings;

  protected settings(): PublicSettings | null {
    return this.settingsGlob();
  }
}
