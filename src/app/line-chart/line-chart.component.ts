import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';

export interface DummyData {
  x: string;
  y: string;
  y2: string;
}

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  private data: DummyData[] = [
    { x: '1.0', y: '0.001', y2: '0.63' },
    { x: '3.0', y: '0.003', y2: '0.84' },
    { x: '4.0', y: '0.024', y2: '0.56' },
    { x: '4.5', y: '0.054', y2: '0.22' },
    { x: '4.6', y: '0.062', y2: '0.15' },
    { x: '5.0', y: '0.100', y2: '0.08' },
    { x: '6.0', y: '0.176', y2: '0.20' },
    { x: '8.0', y: '0.198', y2: '0.71' },
    { x: '9.0', y: '0.199', y2: '0.65' },
  ];

  private svg: any;

  private pxX = 600;
  private pxY = 300;

  private scX: any;
  private scY: any;
  private scY2: any;

  private margin = 50;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;

  constructor(public chartElem: ElementRef) { }

  ngOnInit() {
    console.log(this.data);
    this.createSvg();
    this.createCxScale();
    this.createCyScale();
    this.createCy2Scale();
    this.createChart();
  }

  createCxScale() {
    this.scX = d3
      .scaleLinear()
      .domain([d3.max(this.data, d => +d.x as any), d3.min(this.data, d => +d.x as any)])
      .range([0, this.pxX]);
  }

  createCyScale() {
    this.scY = d3
      .scaleLinear()
      .domain([d3.max(this.data, d => +d.y as any), d3.min(this.data, d => +d.y as any)])
      .range([this.pxY, 0]);
  }

  createCy2Scale() {
    this.scY2 = d3.scaleLinear()
      .domain([d3.max(this.data, d => +d.y2 as any), d3.min(this.data, d => +d.y2 as any)])
      .range([this.pxY, 0]);
  }

  private getNewMaxValue(prop: String) {
    return d3.max(this.data, (d: any) => d.prop) as Number;
  }

  private getNewMinValue(prop: String) {
    return d3.min(this.data, (d: any) => d.prop) as Number;
  }

  // Step 1: create the svg element
  createSvg() {
    console.log(this.data)
    d3.select('svg').remove();

    const element = this.chartElem.nativeElement;

    this.svg = d3
      .select(element)// First, d3 has to select the element reference with its nativeElement
      .select('.lineChart') // Then select the element with my classname see: https://medium.com/weekly-webtips/build-a-simple-line-chart-with-d3-js-in-angular-ccd06e328bff
      .append('svg')
      .style('background-color', 'lightgrey')
      .attr(
        'viewBox',
        `0 0 ${this.width + this.margin * 2} ${this.height + this.margin * 2}`
      )
      .style('background-color', 'lightgrey')
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
    /** To make the chart responsive, I replace the set height and width
     *  with a viewBox attribute using the same height and width values. */
    /*.attr(
      'viewBox',
      `0 0 ${this.width + this.margin * 2} ${this.height + this.margin * 2}`
    )*/
  }

  // Step 2: render the chart
  createChart() {
    this.svg
      .append('g').attr('id', 'ds1')
      .selectAll("circle")
      .data(this.data)
      .enter()
      .append("circle")
      .attr("r", 5).attr("fill", "green")
      .attr("cx", (d: DummyData) => {
        let x = +d.x;
        return this.scX(x)
      })
      .attr("cy", (d: DummyData) => {
        let y = +d.y
        return this.scY(y)
      });

    this.svg
      .append('g').attr('id', 'ds2')
      .selectAll("circle")
      .data(this.data)
      .enter().append("circle")
      .attr("r", 5).attr("fill", "blue")
      .attr("cx", (d: DummyData) => {
        let x = +d.x;
        return this.scX(x)
      })
      .attr("cy", (d: DummyData) =>{
        let y = +d.y2
        return this.scY2(y)
      });

  }
}
