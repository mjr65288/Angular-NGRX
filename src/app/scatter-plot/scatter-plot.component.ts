import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';

export interface DummyData {
  x: string;
  y: string;
}

@Component({
  selector: 'scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.css']
})
export class ScatterPlotComponent implements OnInit {
  private data: DummyData[] = [
    { x: '100', y: '50' },
    { x: '200', y: '100' },
    { x: '300', y: '150' },
    { x: '400', y: '200' },
    { x: '500', y: '250' },
  ];

  //@ViewChild('chart') private chartContainer!: ElementRef;
  //@ViewChild('barChart')private chartContainer!: ElementRef;

  private svg: any;
  //private width = 600;
  //private height: 300;

  private margin = 50;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;

  constructor(public chartElem: ElementRef) {}

  ngOnInit() {
    console.log(this.data);
    this.createChart();
    this.createSvg();
    this.renderChart();
  }

  // Step 1: create the svg element
  createSvg() {
    d3.select('svg').remove();

    const element = this.chartElem.nativeElement;

    this.svg = d3
      .select(element)// First, d3 has to select the element reference with its nativeElement
      .select('.scatterChart') // Then select the element with my classname see: https://medium.com/weekly-webtips/build-a-simple-line-chart-with-d3-js-in-angular-ccd06e328bff
      .append('svg')
      //.attr('width', this.width)
      //.attr('height', this.height)
      //.attr("width", this.width + (this.margin * 2))
      //.attr("height", this.height + (this.margin * 2))
      /** To make the chart responsive, I replace the set height and width
       *  with a viewBox attribute using the same height and width values. */
      .attr(
        'viewBox',
        `0 0 ${this.width + this.margin * 2} ${this.height + this.margin * 2}`
      )
      .style('background-color', 'lightgrey')
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  // Step 2: render the chart
  renderChart() {
    this.svg
      .selectAll('circle')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('fill', 'red')
      .attr('cx', (d: DummyData) => +d.x)
      .attr('cy', (d: DummyData) => +d.y);
  }

  createChart() {
    d3.select('svg')
      .selectAll('circle')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('fill', 'red')
      .attr('cx', (d: DummyData) => +d.x)
      .attr('cy', (d: DummyData) => +d.y);
  }
}
