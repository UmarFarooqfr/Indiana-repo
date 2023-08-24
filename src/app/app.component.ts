import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

export interface IAuthors{ id: number; name: string }
export interface ICol{ name: string }
export interface IFilter{ name: string }
export interface IRow{ name: string; start: string; end: string }


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'serach-filter';
  firstFilter  = new FormControl('');
  inputField1 = new FormControl('');
  headerFilter = new FormControl('');
  baseOnFilter = new FormControl('');
  inputField = new FormControl('');
  authorsDetails: IAuthors[] = [
    { id: 1, name: 'Indiana University South Bend' },
    { id: 2, name: 'All of IUScholarWorks' },
  ];
  cols: ICol[] = [ { name: 'Name' }, { name: 'Start' }, { name: 'End' }];
  filterBaseValue: IFilter[] = [ { name: 'Contains' }, { name: 'Equals' }, { name: 'Not Contains' }, { name: 'Not Equals' } ];
  fileretedArray: IFilter[] = [];
  mainArray: IRow[] = [
    { name: 'IUScholar', start: '1987', end: '2003' },
    { name: 'IUScholar', start: '1986', end: '2004' },
    { name: 'IUScholar', start: '1968', end: '2006' },
    { name: 'IUScholar', start: '1959', end: '2009' },
    { name: 'IUScholar', start: '1965', end: '2007' },
    { name: 'UniversitySouthBend', start: '1969', end: '2001' },
    { name: 'UniversitySouthBend', start: '1685', end: '2010' },
    { name: 'UniversitySouthBend', start: '1994', end: '2011' },
    { name: 'UniversitySouthBend', start: '1987', end: '2002' },
    { name: 'UniversitySouthBend', start: '1997', end: '2011' },
  ];
  // fakeArray: any = this.mainArray;
  displayedColumns: string[] = ['name', 'start', 'end'];
  dataSource: any = new MatTableDataSource(this.mainArray);
  originalArray: string = ''
  constructor() {
    this.dataSource = new MatTableDataSource(this.mainArray)
    this.originalArray = JSON.stringify(this.mainArray)
  }
  changeClient(value: number) {
    console.log('value: ', value);
    console.log("this.mainArray", this.mainArray)
    if (value === 1) {
      this.fileretedArray = [];
      this.mainArray.forEach((data: any) => {
        if (data.name === 'UniversitySouthBend') {
          this.fileretedArray.push(data);
        }
      });

      this.dataSource = new MatTableDataSource(this.fileretedArray);
      console.log('this.dataSource: ', this.dataSource);
    } else if (value === 2) {
      this.fileretedArray = [];
      this.mainArray.forEach((data: any) => {
        if (data.name === 'IUScholar') {
          this.fileretedArray.push(data);
        }
      });

      this.dataSource = new MatTableDataSource(this.fileretedArray);
      console.log('this.dataSource: ', this.dataSource);
    } else {
      this.dataSource = new MatTableDataSource(this.mainArray);
    }
  }
  applyFilter() {
    const filterValue = this.inputField1.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  mainApplyFilter() {
    if (!this.fileretedArray.length) {
      this.dataSource = [...JSON.parse(this.originalArray)]
    }

    this.checkContains();
  }
  checkContains() {
    const mainData = this.fileretedArray.length ? this.fileretedArray : [...JSON.parse(this.originalArray)]
    if (this.baseOnFilter.value === 'Contains') {
      console.log("filetqghfvhv", this.fileretedArray)
      this.dataSource = mainData?.filter((data: any) => {
        return data[`${this.headerFilter.value?.toLowerCase()}`]
          ?.toLowerCase()
          .includes(this.inputField.value.toLowerCase());
      });
      console.log(' this.dataSource: ', this.dataSource);
    } else if (this.baseOnFilter.value === 'Equals') {
      this.dataSource = mainData?.filter((data: any) => {
        return (
          data[`${this.headerFilter.value?.toLowerCase()}`]?.toLowerCase() ===
          this.inputField.value.toLowerCase()
        );
      });
    } else if (this.baseOnFilter.value === 'Not Contains') {
      this.dataSource = mainData?.filter((data: any) => {
        return !data[`${this.headerFilter.value?.toLowerCase()}`]
          ?.toLowerCase()
          .includes(this.inputField.value.toLowerCase());
      });
      console.log(' Equals ', this.baseOnFilter.value);
    } else if (this.baseOnFilter.value === 'Not Equals') {
      this.dataSource = mainData?.filter((data: any) => {
        return (
          data[`${this.headerFilter.value?.toLowerCase()}`]?.toLowerCase() !==
          this.inputField.value.toLowerCase()
        );
      });
      console.log('Not Equals ', this.baseOnFilter.value);
    }
  }

  reset(){
    this.headerFilter.reset();
    this.baseOnFilter.reset();
    this.inputField.reset();
    this.firstFilter.reset();
    this.dataSource = new MatTableDataSource(this.mainArray);
  }

}