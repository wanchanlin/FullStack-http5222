const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var xml;
let parkNS = "http://www.example.org/PFRMapData";

async function loadXml() {
  if (xml == undefined) {
    let response = await fetch(
      "http://localhost:8888/facilities-data.xml",
      {
        method: "get",
        headers: {
          "Content-Type": "application/xml"
        }
      }
    );
    //convert XML string to XML DOM document
    data = new JSDOM(await response.text(), { contentType: "application/xml" });
    //console.log(data);
    xml = data.window.document; //set the xml to the XML DOM document which we can query using DOM methods
  }
  return xml;
}
async function loadParks() {
  xml = await loadXml();
  return xml.querySelectorAll("Location");
}
async function getParkById(id) {
  xml = await loadParks();
  let result = xml.evaluate(
  `//Location[LocationID/text()='${id}']`, xml, parkNS, 4, null);
  //expecting only one result so iterateNext() only needs to be run once
  return result.iterateNext();
} 

module.exports = {
  loadParks,
  getParkById
};