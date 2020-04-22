import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

export interface Region {
  region: string;
  name: string;
  url: string;
}

@Injectable()
export class RegionService {
  regions: Region[] = [
    { region: 'sea', name: 'south east asia', url: 'https://seadnfiles.netlify.app/public' },
    { region: 'na', name: 'north america', url: 'https://nadnfiles.netlify.app/public' },
    { region: 'eu', name: 'europe', url: 'https://eudnfiles.netlify.app/public' },
    { region: 'th', name: 'thailand', url: 'https://thdnfiles.netlify.app/public' },
    { region: 'tw', name: 'taiwan 臺灣', url: 'https://twdnfiles.netlify.app/public' },
    { region: 'cdn', name: 'china 中國', url: 'https://cdnfiles.netlify.app/public' },
    { region: 'kdn', name: 'korea 대한민국', url: 'https://kdnfiles.netlify.app/public' },
    { region: 'br', name: 'Brazil', url: 'https://dnbr.netlify.app/public' },
  ];

  region: Region = this.regions[this.regions.length - 1];
  tRegion: Region = this.regions[this.regions.length - 1];
  subject = new Subject();
  override: boolean;

  constructor() {
    const dntLocationRegion = localStorage.getItem('lastDNTRegion');
    if (dntLocationRegion) {
      const foundRegion = this.regions.find(r => r.region === dntLocationRegion);
      if (foundRegion) {
        this.region = foundRegion;
        this.tRegion = foundRegion;
      }
    }
  }

  setRegion(region: Region) {
    this.region = region;
    if (!this.override) {
      this.tRegion = region;
    }
    localStorage.setItem('lastDNTRegion', this.region.region);
    this.subject.next();
  }

  setTLocation(region: Region) {
    this.tRegion = region;
    this.subject.next();
  }

  setOverride(value: boolean) {
    this.override = value;
  }

}
