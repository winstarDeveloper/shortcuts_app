class APIFeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
  
    filter() {
      let queryObj = { ...this.queryString };
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach((e) => delete queryObj[e]);
      // console.log(req.query, queryObj);
  
      // Advanced Filtering
      // let queryStr = JSON.stringify(queryObj);
      // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
      // queryObj = JSON.parse(queryStr);
      // console.log(queryObj);
  
      this.query = this.query.find(queryObj);
      return this;
    }
  
    sort() {
      this.query = this.query.sort('-hits');
      return this;
    }
  
    limitFields() {
      // Field Limiting
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      }
      return this;
    }
  
    pagination() {
      // Pagination
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 10;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
  
      // if(this.queryString.page){
      //   const numApps = await App.countDocuments();
      //   if(skip >= numApps) throw new Error('This page does not exist');
      // }
      return this;
    }
  }

  module.exports = APIFeatures;