import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';

export interface DummyData {
  x: string;
  y: string;
  y2: string;
}

@Component({
  selector: 'line-chart-axis',
  templateUrl: './line-chart-axis.component.html',
  styleUrls: ['./line-chart-axis.component.css']
})
export class LineChartAxisComponent implements OnInit {

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
  private g1: any ;
  private g2:any;
  private axMkr:any

  private pxX = 600;
  private pxY = 300;

  scX: any;
  private scY: any;
  private scY2: any;

  private margin = 50;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;
  private lineMaker: any;

  constructor(public chartElem: ElementRef) { }

  ngOnInit() {
    console.log(this.data);
    this.createSvg();
    this.createCxScale();
    this.createCyScale();
    this.createCy2Scale();
    //this.createAxes();
    this.createChart();
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
      /** To make the chart responsive, I replace the set height and width
     *  with a viewBox attribute using the same height and width values. */
      .attr(
        'viewBox',
        `0 0 ${this.width + this.margin * 2} ${this.height + this.margin * 2}`
      )
      .style('background-color', 'lightgrey')
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');

      // Create the two <g> container elements, one for each data set
      this.g1 = this.svg.append( "g" );                           6
      this.g2 = this.svg.append( "g" );
  }

  createCxScale() {
    this.scX = this.makeScale((d: DummyData) => d["x"], [0, this.pxX]);
  }

  createCyScale() {
    this.scY = this.makeScale((d: DummyData) => d["y"], [this.pxY, 0]);
  }

  createCy2Scale() {
    this.scY2 = this.makeScale((d: DummyData) => d["y2"], [this.pxY, 0]);
  }

  makeScale(accessor: (d: any) => any, range: number[]): any {
    return d3.scaleLinear()
      .domain(d3.extent(this.data, accessor) as number[])
      .range(range).nice();
  }

  createAxes(){
    /**The axis for the first data set is drawn on the left side of the graph; remember that by default all axes are rendered
     * at the origin. The axisRight object draws tick labels on the right side of the axis, so that they are outside the
     * graph if the axis is placed on the graph’s right side. Here, we use it on the left side and allow for the tick labels
     * to be inside the graph. */
    this.axMkr = d3.axisRight( this.scY );

    /**he factory function d3.axisRight( scale ) returns a function object that generates the axis with all its parts.
     * It requires an SVG container (typically a <g> element) as argument, and creates all elements of
     * the axis as children of this container element. */
    this.axMkr( this.svg.append("g") );


    this.axMkr = d3.axisLeft( this.scY2 );
    this.svg.append( "g" )
      /**For the axis on the right side of the graph, the container element must be moved to the appropriate location.
       *This is done using the SVG transform attribute */
      .attr( "transform", "translate(" + this.pxX + ",0)" )
      /**Instead of calling the axMkr function explicitly with the containing <g> element as argument,
       * the axMkr function is passed as argument to the call() function instead. */
      .call( this.axMkr );

    this.svg.append( "g" )
    .attr( "transform", "translate(0,"+this.pxY+")" )
    .call( d3.axisTop( this.scX ));
  }

  // Step 2: render the chart
  createChart() {
    this.drawData( this.g1, (d:DummyData) => this.scY(d["y"]), d3.curveStep );
    this.drawData( this.g2, (d:DummyData) => this.scY2(d["y2"]), d3.curveNatural );

    this.g1.selectAll( "circle" ).attr( "fill", "green" );
    this.g1.selectAll( "path" ).attr( "stroke", "cyan" );

    this.g2.selectAll( "circle" ).attr( "fill", "blue" );
    this.g2.selectAll( "path" ).attr( "stroke", "red" )

  }

  drawData(g: any, accessor: (d: any) => any, curve: d3.CurveFactory): any {
    //draw circles
    g.selectAll("circle").data(this.data).enter()
      .append("circle")
      .attr("r", 5)
      .attr("cx", (d: DummyData) => this.scX(d["x"]))
      .attr("cy", accessor);

    //draw lines
    let lnMkr= d3.line().curve(curve)
      .x((d: any) => this.scX(d["x"]))
      .y(accessor);

      g.append( "path" ).attr( "fill", "none" )
      .attr( "d", lnMkr( this.data as any) );

      let axMkr = d3.axisRight( this.scY );
      axMkr( this.svg.append("g") );

      axMkr = d3.axisLeft( this.scY2 );
      this.svg.append( "g" )
          .attr( "transform", "translate(" + this.pxX + ",0)" )
          .call( axMkr );

      //draw axis
      this.svg.append( "g" ).call( d3.axisTop( this.scX ) )
          .attr( "transform", "translate(0,"+this.pxY+")" );
  }

}


