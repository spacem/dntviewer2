import { Component, OnInit } from '@angular/core';
import { RegionService } from '../region.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {

  dntVersion: string;
  edit: boolean;
  override: boolean;
  tHoverLocation: any;
  hoverLocation: any;

  constructor(public regionService: RegionService) { }

  ngOnInit() {
    this.override = this.regionService.override;
  }

  setRegion(region) {
    this.edit = false;
    this.regionService.setRegion(region);
  }

  setTLocation(region) {
    this.edit = false;
    this.regionService.setTLocation(region);
  }

  setOverride(value: boolean) {
    this.override = value;
    this.regionService.setOverride(value);
  }
}
