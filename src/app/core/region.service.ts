import { Injectable, OnInit } from '@angular/core';

export interface Region {
  region: string;
  name: string;
  url: string;
}

@Injectable()
export class RegionService implements OnInit {
  regions: Region[] = [
    { region: 'sea', name: 'south east asia', url: 'https://seadnfiles.netlify.com/public' },
    { region: 'na', name: 'north america', url: 'https://nadnfiles.netlify.com/public' },
    { region: 'eu', name: 'europe', url: 'https://eudnfiles.netlify.com/public' },
    { region: 'th', name: 'thailand', url: 'https://thdnfiles.netlify.com/public' },
    { region: 'vn', name: 'vietnam ', url: 'https://vndnfiles.firebaseapp.com' },
    { region: 'tw', name: 'taiwan 臺灣', url: 'https://twdnfiles.firebaseapp.com' },
    { region: 'cdn', name: 'china 中國', url: 'https://cdnfiles.netlify.com/public' },
    { region: 'kdn', name: 'korea 대한민국', url: 'https://kdnfiles.netlify.com/public' },
  ];

  region: Region = this.regions[this.regions.length - 1];

  constructor() {
  }

  ngOnInit() {
    const dntLocationRegion = localStorage.getItem('lastDNTRegion');
    if (dntLocationRegion) {
      const foundRegion = this.regions.find(r => r.region === dntLocationRegion);
      if (foundRegion) {
        this.region = foundRegion;
      }
    }
  }

}
