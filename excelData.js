const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const users = [
  { Id: 1, Name: 'Alice', Address: '1234 Elm Street, Springfield, IL', Age: 28, DateOfBirth: '1996-01-01' },
  { Id: 2, Name: 'Bob', Address: '5678 Maple Avenue, Springfield, IL', Age: 32, DateOfBirth: '1992-02-14' },
  { Id: 3, Name: 'Charlie', Address: '9101 Oak Drive, Springfield, IL', Age: 25, DateOfBirth: '1998-03-21' },
  { Id: 4, Name: 'David', Address: '123 Pine Lane, Springfield, IL', Age: 30, DateOfBirth: '1994-04-12' },
  { Id: 5, Name: 'Eve', Address: '456 Birch Road, Springfield, IL', Age: 27, DateOfBirth: '1997-05-10' },
  { Id: 6, Name: 'Frank', Address: '789 Cedar Street, Springfield, IL', Age: 35, DateOfBirth: '1989-06-25' },
  { Id: 7, Name: 'Grace', Address: '1012 Walnut Avenue, Springfield, IL', Age: 29, DateOfBirth: '1995-07-30' },
  { Id: 8, Name: 'Hank', Address: '1314 Chestnut Drive, Springfield, IL', Age: 34, DateOfBirth: '1990-08-19' },
  { Id: 9, Name: 'Ivy', Address: '1516 Fir Lane, Springfield, IL', Age: 26, DateOfBirth: '1997-09-15' },
  { Id: 10, Name: 'Jack', Address: '1718 Spruce Road, Springfield, IL', Age: 31, DateOfBirth: '1993-10-25' },
  { Id: 11, Name: 'Karen', Address: '1920 Willow Street, Springfield, IL', Age: 28, DateOfBirth: '1996-11-11' },
  { Id: 12, Name: 'Leo', Address: '2122 Sycamore Avenue, Springfield, IL', Age: 30, DateOfBirth: '1994-12-05' },
  { Id: 13, Name: 'Mia', Address: '2324 Hemlock Drive, Springfield, IL', Age: 27, DateOfBirth: '1997-01-16' },
  { Id: 14, Name: 'Nina', Address: '2526 Redwood Lane, Springfield, IL', Age: 32, DateOfBirth: '1992-02-22' },
  { Id: 15, Name: 'Oscar', Address: '2728 Palm Road, Springfield, IL', Age: 25, DateOfBirth: '1999-03-03' },
  { Id: 16, Name: 'Paul', Address: '2930 Cypress Street, Springfield, IL', Age: 34, DateOfBirth: '1990-04-09' },
  { Id: 17, Name: 'Quinn', Address: '3132 Larch Avenue, Springfield, IL', Age: 29, DateOfBirth: '1995-05-12' },
  { Id: 18, Name: 'Rose', Address: '3334 Magnolia Drive, Springfield, IL', Age: 35, DateOfBirth: '1989-06-28' },
  { Id: 19, Name: 'Steve', Address: '3536 Beech Lane, Springfield, IL', Age: 26, DateOfBirth: '1997-07-14' },
  { Id: 20, Name: 'Tina', Address: '3738 Aspen Road, Springfield, IL', Age: 31, DateOfBirth: '1993-08-23' },
];

const worksheet = xlsx.utils.json_to_sheet(users);

const workbook = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(workbook, worksheet, 'Users');

const outputPath = path.join(__dirname, 'users.xlsx');
xlsx.writeFile(workbook, outputPath);

console.log('Excel file created successfully at:', outputPath);
