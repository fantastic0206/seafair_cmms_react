
const sortOption = {};
class sortFunction {
  constructor(size) {
    this.size = size || 2000;
    this.datas = [];
    this.sortKey = null;
    this.sortDir = null;
    
  }  
  getSize() {
    return this.size;
  }
  getSortAsc(sortKey,data) {
    this.datas=data;
    sortOption.sortKey = sortKey;
    sortOption.sortDir = 'ASC';
    console.log(sortKey,'this.sort');
    return this.datas.sort(this.sort);
  }
  getSortDesc(sortKey,data) {
    this.datas=data;
    sortOption.sortKey = sortKey;
    sortOption.sortDir = 'DESC';
    console.log(sortKey,data,'this.sort');
    return this.datas.sort(this.sort);
  }
  sort(optionA, optionB) {
    console.log(optionA,optionB,'optionA,optionB');
    const valueA = optionA[sortOption.sortKey]!=null?optionA[sortOption.sortKey].toString().toUpperCase():null;
    const valueB = optionB[sortOption.sortKey]!=null?optionB[sortOption.sortKey].toString().toUpperCase():null;
    let sortVal = 0;
    if (valueA > valueB) {
      sortVal = 1;
    }
    if (valueA < valueB) {
      sortVal = -1;
    }
    if (sortVal !== 0 && sortOption.sortDir === 'DESC') {
      return sortVal * -1;
    }
    return sortVal;
  }
}
export default sortFunction;
