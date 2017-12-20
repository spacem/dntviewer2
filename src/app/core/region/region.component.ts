import { Component, OnInit } from '@angular/core';
import { RegionService } from '../region.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {

  constructor(private regionService: RegionService) { }

  ngOnInit() {
  }

}
