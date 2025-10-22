import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type Lang = 'en' | 'es';

const APP_STORE_URL = 'https://apps.apple.com/us/app/meditation-ai/id6753632638';

const TRANSLATIONS: Record<Lang, {
  navHome: string;
  navFeatures: string;
  navCTA: string;
  heroTag: string;
  heroTitlePrimary: string;
  heroTitleSecondary: string;
  heroDescription: string;
  heroButton: string;
  sidebarTitle: string;
  sidebarDescription: string;
  sidebarButton: string;
  metricCaption: string;
  metricTagOne: string;
  metricTagTwo: string;
}> = {
  en: {
    navHome: 'Home',
    navFeatures: 'Features',
    navCTA: 'Download iOS',
    heroTag: 'Meditation',
    heroTitlePrimary: 'Meaningful Mindfulness',
    heroTitleSecondary: 'Meditations',
    heroDescription:
      'Relax, breathe, and connect with guided meditations, calming sounds, and mindful rituals crafted to follow you everywhere.',
    heroButton: 'Download on the App Store',
    sidebarTitle: 'Discover Meditation AI',
    sidebarDescription:
      'Short sessions, tailored programs, and simple tools to track your daily wellbeing in one intuitive experience.',
    sidebarButton: 'Open App Store',
    metricCaption: 'people improve their mentality here',
    metricTagOne: 'Mental health',
    metricTagTwo: 'Mindfulness'
  },
  es: {
    navHome: 'Inicio',
    navFeatures: 'Características',
    navCTA: 'Descarga iOS',
    heroTag: 'Meditación',
    heroTitlePrimary: 'Mindfulness Significativo',
    heroTitleSecondary: 'Meditaciones',
    heroDescription:
      'Relájate, respira y conecta con meditaciones guiadas, sonidos y rituales conscientes pensados para acompañarte a donde vayas.',
    heroButton: 'Descargar en App Store',
    sidebarTitle: 'Descubre Meditation AI',
    sidebarDescription:
      'Sesiones cortas, programas personalizados y herramientas para registrar tu bienestar diario en una app intuitiva.',
    sidebarButton: 'Ir a App Store',
    metricCaption: 'personas mejoran su bienestar mental aquí',
    metricTagOne: 'Salud mental',
    metricTagTwo: 'Mindfulness'
  }
};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly currentLang = signal<Lang>('en');
  protected readonly text = computed(() => TRANSLATIONS[this.currentLang()]);
  protected readonly appStoreUrl = APP_STORE_URL;
  protected readonly languageToggleLabel = computed(() =>
    this.currentLang() === 'en' ? 'ES' : 'EN'
  );

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const browserLang = navigator.language?.toLowerCase() ?? '';
      if (browserLang.startsWith('es')) {
        this.currentLang.set('es');
      }
    }
  }

  protected switchLanguage(): void {
    this.currentLang.update((lang) => (lang === 'en' ? 'es' : 'en'));
  }
}
