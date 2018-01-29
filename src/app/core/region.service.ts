import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export interface Region {
  region: string;
  name: string;
  url: string;
}

@Injectable()
export class RegionService {
  regions: Region[] = [
    { region: 'sea', name: 'south east asia', url: 'https://seadnfiles.netlify.com/public' },
    { region: 'na', name: 'north america', url: 'https://nadnfiles.netlify.com/public' },
    { region: 'eu', name: 'europe', url: 'https://eudnfiles.netlify.com/public' },
    { region: 'th', name: 'thailand', url: 'https://thdnfiles.netlify.com/public' },
    { region: 'tw', name: 'taiwan 臺灣', url: 'https://twdnfiles.netlify.com/public' },
    { region: 'cdn', name: 'china 中國', url: 'https://cdnfiles.netlify.com/public' },
    { region: 'kdn', name: 'korea 대한민국', url: 'https://kdnfiles.netlify.com/public' },
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
