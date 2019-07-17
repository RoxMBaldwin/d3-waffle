// // var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1CCvvhDV6TCd_kn8MzBYTOjoU32LRD72fVlQTO_dnTMk/edit?usp=sharing';

// // function getData() {
// //   Tabletop.init( { key: publicSpreadsheetUrl,
// //                    callback: showInfo,
// //                    simpleSheet: false } )
// // }

// // function showInfo(data, tabletop) {
// //    const vScoreData = data.Sheet1.raw.feed.entry[3]
// //    console.log(vScoreData);
   
// //    return vScoreData;
// // //   console.log(data);
// // //   console.log(vScoreData);

// // }

// // getData();
// let arr = []
// function tableTop() {
//    var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1CCvvhDV6TCd_kn8MzBYTOjoU32LRD72fVlQTO_dnTMk/edit?usp=sharing';

//    Tabletop.init( { key: publicSpreadsheetUrl,
//                      callback: showInfo,
//                      simpleSheet: false } )

// }


// function showInfo(data, tabletop) {
   
//    const vScoreSovrn = data.Sheet1.raw.feed.entry[3].gsx$_cokwr.$t
//    const vScoreGeneral = data.Sheet1.raw.feed.entry[3].gsx$_cpzh4.$t;
   
//    arr.push({"Sovrn //Signal":vScoreSovrn});
//    arr.push({"General Audience": vScoreGeneral});
//    console.log(arr);
//    return arr;
// };


// tableTop();
// console.log(arr);


// // export { tableTop, arr }