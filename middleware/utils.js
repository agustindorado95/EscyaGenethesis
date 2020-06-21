const sortByObjectIndex = (a, b) => {

    const indexA = a.index;
    const indexB = b.index;
  
    let comparison = 0;
    if (indexA > indexB) {
      comparison = 1;
    } else if (indexA < indexB) {
      comparison = -1;
    }
    return comparison;
  }

module.exports = {sortByObjectIndex}