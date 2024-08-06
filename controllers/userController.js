const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const User = require('../models/user');

exports.uploadExcel = async (req, res) => {
  const filePath = req.file.path;
  const workBook = XLSX.readFile(filePath);
  const sheetName = workBook.SheetNames[0];
  const users = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);

  let errors = [];

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const lineNumber = i + 1;
    const convertedAge = Number(user.Age);

    if (isNaN(convertedAge)) {
      errors.push({ record: user, line: lineNumber, error: 'Age should be a number' });
    } else if (isNaN(Date.parse(user.DateOfBirth))) {
      errors.push({ record: user, line: lineNumber, error: 'Date of Birth should be a date' });
    } else if (user.Address.length < 25) {
      errors.push({ record: user, line: lineNumber, error: 'Address should have at least 25 characters' });
    } else {
      const newUser = new User({
        id: user.Id ? user.Id : null,
        name: user.Name ? user.Name : null,
        address: user.Address ? user.Address : null,
        age: convertedAge ? convertedAge : user.Age,
        dateOfBirth: user.DateOfBirth ? new Date(user.DateOfBirth) : null
      });
      try {
        await newUser.save();
      } catch (err) {
        errors.push({ record: user, line: lineNumber, error: err.message });
      }
    }
  }

  fs.unlinkSync(filePath); 

  if (errors.length > 0) {
    res.status(400).json(errors);
  } else {
    res.status(200).json({ message: 'All records inserted successfully' });
  }
};

exports.downloadExcel = async (req, res) => {
  const users = await User.find({});
  const workSheet = XLSX.utils.json_to_sheet(users.map(user => user.toObject())); 
  const workBook = XLSX.utils.book_new(); 
  XLSX.utils.book_append_sheet(workBook, workSheet, 'Users'); 
  const filePath = path.join(__dirname, '../uploads', 'users.xlsx'); 
  XLSX.writeFile(workBook, filePath); 

  res.download(filePath, 'users.xlsx', (err) => {
    if (err) {
      console.error(err);
    }
    fs.unlinkSync(filePath); 
  }); 
};
