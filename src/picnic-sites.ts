export interface PicnicSite {
  "Shelter Name": string;
  Fee: string;
  Capacity: number;
  "Unsheltered Tables": number | string;
  "Sheltered Tables": number | string;
  ADA: string;
  "Photo 1": string;
  "Photo Caption 1": string;
  "Photo 2": string;
  "Photo Caption 2": string;
  "Photo 3": string;
  "Photo Caption 3": string;
  "Photo 4": string;
  "Photo Caption 4": string;
  "Map Link": string;
  Features: string;
  "Park xID": number;
}

export let picnicSites: PicnicSite[] = [
  {
    "Shelter Name": "Seward Park Shelter #4",
    Fee: "$210.00",
    Capacity: 50,
    "Unsheltered Tables": "",
    "Sheltered Tables": 4,
    ADA: "",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/seward4-1.jpg",
    "Photo Caption 1": "",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/seward4-2.jpg",
    "Photo Caption 2": "",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "(http://www.seattle.gov/documents/Departments/ParksAndRecreation/Reserve/Picnic/Seward_Map_Directions_2023.pdf)",
    Features: "",
    "Park xID": 64084,
  },
  {
    "Shelter Name": "Seward Park Shelter #5",
    Fee: "$210.00",
    Capacity: 50,
    "Unsheltered Tables": "",
    "Sheltered Tables": 4,
    ADA: "",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/seward5-1.jpg",
    "Photo Caption 1": "",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/seward5-2.jpg",
    "Photo Caption 2": "",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "(http://www.seattle.gov/documents/Departments/ParksAndRecreation/Reserve/Picnic/Seward_Map_Directions_2023.pdf)",
    Features: "",
    "Park xID": 64084,
  },
  {
    "Shelter Name": "View Ridge Playfield Shelter #1",
    Fee: "$185.00",
    Capacity: 50,
    "Unsheltered Tables": 3,
    "Sheltered Tables": 3,
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/ViewRidgePlayfieldShelter.jpg",
    "Photo Caption 1": "View Ridge Playfield Shelter",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/ViewRidgePlayfieldShelter-B.jpg",
    "Photo Caption 2": "View Ridge Playfield Shelter",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "http://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/View_Ridge_Map_Directions_Update.pdf",
    Features: "",
    "Park xID": 64042,
  },
  {
    "Shelter Name": "Warren G. Magnuson Park Shelter #1",
    Fee: "$320.00",
    Capacity: 100,
    "Unsheltered Tables": "",
    "Sheltered Tables": 8,
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/mag-s1.jpg",
    "Photo Caption 1": "Magnuson Park Shelter #1",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/MagnusonShelter1withLake.jpg",
    "Photo Caption 2":
      "Magnuson Park Shelter #1 with Lake Washington in the Background",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "http://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/Magnuson2023.pdf",
    Features: "",
    "Park xID": 63826,
  },
  {
    "Shelter Name": "Warren G. Magnuson Park Shelter #2",
    Fee: "$195.00",
    Capacity: 50,
    "Unsheltered Tables": 9,
    "Sheltered Tables": 3,
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/MagnusonBeachTable3.jpg",
    "Photo Caption 1": "Magnuson Park Table 3",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/MagnusonParkShelter2.jpg",
    "Photo Caption 2": "Magnuson Park Shelter #2",
    "Photo 3":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/MagnusonParkTable2.jpg",
    "Photo Caption 3": "Magnuson Park Table 2 with Table 1 in the Distance",
    "Photo 4": "",
    "Photo Caption 4": "Magnuson Park Tables 6,7,8,9",
    "Map Link":
      "http://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/Magnuson2023.pdf",
    Features: "",
    "Park xID": 63826,
  },
  {
    "Shelter Name": "Warren G. Magnuson Park Shelter #3",
    Fee: "$220.00",
    Capacity: 60,
    "Unsheltered Tables": "",
    "Sheltered Tables": 4,
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/mag-s3.jpg",
    "Photo Caption 1": "Magnuson Park Shelter 3",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/MagnusonParkShelter3.jpg",
    "Photo Caption 2":
      "2. Magnuson Shelter 3 with Tennis Center and Parking Lot in Background",
    "Photo 3":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/MagnusonShelter3withPlayground.jpg",
    "Photo Caption 3": "Magnuson Shelter 3 with Playground in Background",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "http://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/Magnuson2023.pdf",
    Features: "",
    "Park xID": 63826,
  },
  {
    "Shelter Name": "Westcrest Park Picnic Area Tables Only",
    Fee: "$0.00",
    Capacity: 50,
    "Unsheltered Tables": 6,
    "Sheltered Tables": "",
    ADA: "",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/WestcrestTables1-3.jpg",
    "Photo Caption 1": "Westcrest Tables 1-3",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/WestcrestTable4-6.jpg",
    "Photo Caption 2": "Westcrest tables 4-6",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "(http://www.seattle.gov/documents/Departments/ParksAndRecreation/Reserve/Picnic/Westcrest_Map_Directions_2023.pdf)",
    Features: "",
    "Park xID": 64018,
  },
  {
    "Shelter Name": "Woodland Park Shelter #3",
    Fee: "$135.00",
    Capacity: 140,
    "Unsheltered Tables": 48,
    "Sheltered Tables": 1,
    ADA: "",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/woodland3-1.jpg",
    "Photo Caption 1": "",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/woodland3-2.jpg",
    "Photo Caption 2": "",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "https://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/Woodland3.pdf",
    Features: "",
    "Park xID": 64025,
  },
  {
    "Shelter Name": "Woodland Park Shelter #4",
    Fee: "$135.00",
    Capacity: 50,
    "Unsheltered Tables": 5,
    "Sheltered Tables": 1,
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/woodland4-1.jpg",
    "Photo Caption 1": "",
    "Photo 2":
      "(http://www.seaettle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/WoodandShelter4.jpg)",
    "Photo Caption 2": "",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "https://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/Woodland467.pdf",
    Features: "",
    "Park xID": 64025,
  },
  {
    "Shelter Name": "Woodland Park Shelter #6",
    Fee: "$310.00",
    Capacity: 200,
    "Unsheltered Tables": 9,
    "Sheltered Tables": 3,
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/WoodlandShelter6.jpg",
    "Photo Caption 1": "Woodland Shelter 6",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/WoodandShelter6UncoveredTables1.jpg",
    "Photo Caption 2": "Woodland Shelter 6 and Tables",
    "Photo 3":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/WoodandShelter6_UncoveredTables2.jpg",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "https://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/Woodland467.pdf",
    Features: "",
    "Park xID": 64025,
  },
  {
    "Shelter Name": "Woodland Park Shelter #7",
    Fee: "$185.00",
    Capacity: 30,
    "Unsheltered Tables": "",
    "Sheltered Tables": 3,
    ADA: "",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/woodland7-1.jpg",
    "Photo Caption 1": "",
    "Photo 2": "",
    "Photo Caption 2": "",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "https://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/Woodland467.pdf",
    Features: "",
    "Park xID": 64025,
  },
  {
    "Shelter Name": "View Ridge Playfield Picnic Area Tables Only",
    Fee: "$25.00",
    Capacity: 30,
    "Unsheltered Tables": 3,
    "Sheltered Tables": 0,
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/ViewRidgePlayfieldShelter.jpg",
    "Photo Caption 1": "",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/ViewRidgePlayfieldShelter-B.jpg",
    "Photo Caption 2": "",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "https://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/View_Ridge_Map_Directions_Update.pdf",
    Features: "",
    "Park xID": 64042,
  },
  {
    "Shelter Name": "Carkeek Park Shelter #2",
    Fee: "$195.00",
    Capacity: 150,
    "Unsheltered Tables": 14,
    "Sheltered Tables": 3,
    ADA: "",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/CarkeekParkPlaygroundGrassyAreaShelter2.jpg",
    "Photo Caption 1": "Carkeek Park Shelter 2 Picnic Area From Grassy Area",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/CarkeekParkShelter2withGrill.jpg",
    "Photo Caption 2": "Carkeek Park Shelter 2 With Large Grill",
    "Photo 3":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/CarkeekTables810TwoFirstCome.jpg",
    "Photo Caption 3":
      "Vantage from Carkeek Park Shelter 2 Picnic Area with Views of Picnic Tables 8-10 and Two First Come First Serve Tables",
    "Photo 4":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/CarkeekParkShelter2ViewTable11.jpg",
    "Photo Caption 4": "Carkeek Park Shelter 2 Looking Up From Table 11",
    "Map Link":
      "http://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/Carkeek.pdf",
    Features: "",
    "Park xID": 63773,
  },
  {
    "Shelter Name": "Don Armeni Boat Ramp Picnic Area Tables Only",
    Fee: "$0.00",
    Capacity: 30,
    "Unsheltered Tables": 2,
    "Sheltered Tables": "",
    ADA: "",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/DonArmeniPicnicArea.jpg",
    "Photo Caption 1": "Don Armeni Picnic Tables 1 and 2",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/DonArmeniTable1and2.jpg",
    "Photo Caption 2": "Don Armeni Picnic Tables 1 and 2",
    "Photo 3":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/DonArmeniTable1.jpg",
    "Photo Caption 3": "Don Aremni Picnic Table 1",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "http://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/DonArmeni.pdf",
    Features: "",
    "Park xID": 63685,
  },
  {
    "Shelter Name": "Jose Rizal Park Shelter #1",
    Fee: "$210.00",
    Capacity: 75,
    "Unsheltered Tables": "",
    "Sheltered Tables": 4,
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/JoseRizalShelter.jpg",
    "Photo Caption 1": "",
    "Photo 2": "",
    "Photo Caption 2": "",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "(http://www.seattle.gov/documents/Departments/ParksAndRecreation/Reserve/Picnic/Jose_Rizal_Map_Directions_2023.pdf)",
    Features: "",
    "Park xID": 63692,
  },
  {
    "Shelter Name": "Genesee Park and Playfield Shelter #1",
    Fee: "$285.00",
    Capacity: 100,
    "Unsheltered Tables": "",
    "Sheltered Tables": 7,
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/GeneseeParkShelter.JPG",
    "Photo Caption 1": "Genesee Park Shelter",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/GeneseeParkShelterInside.jpg",
    "Photo Caption 2": "View from Inside Shelter",
    "Photo 3":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/GeneseeParkBBQandShelter.JPG",
    "Photo Caption 3": "Shelter BBQ, Playground in distance",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "http://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/Genesee.pdf",
    Features: "",
    "Park xID": 63936,
  },
  {
    "Shelter Name": "Georgetown Playfield Shelter #1",
    Fee: "$185.00",
    Capacity: 50,
    "Unsheltered Tables": 0,
    "Sheltered Tables": 3,
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/georgetownShelter1.jpg",
    "Photo Caption 1": "Georgetown Shelter #1",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/GeorgetownPlayArea.jpg",
    "Photo Caption 2": "Georgetown Play Area",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "http://www.seattle.gov/Documents/Departments/ParksAndRecreation/Reserve/Picnic/Georgetown_Playfield_Park_Map_2023.pdf",
    Features: "",
    "Park xID": 63935,
  },
  {
    "Shelter Name": "Alki Beach Park Shelter #1",
    Fee: "$120.00",
    Capacity: 130,
    "Unsheltered Tables": 14,
    "Sheltered Tables": "",
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/AlkiShelterwithgrill.jpg",
    "Photo Caption 1":
      "Picnic Shelter at Alki Beach Park With Two Serving Tables",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/AlkiTable12.jpg",
    "Photo Caption 2": "Alki Beach Tables 1, 2",
    "Photo 3":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/AlkiTable8.jpg",
    "Photo Caption 3": "Alki Beach Table 8, 10 and Alki Shelter #1",
    "Photo 4":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/AlkiwithTables510.jpg",
    "Photo Caption 4": "Alki Beach Tables 5-10",
    "Map Link":
      "http://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/AlkiBeach.pdf",
    Features: "",
    "Park xID": 63856,
  },
  {
    "Shelter Name": "Beer Sheva Park Picnic Area Tables Only",
    Fee: "$0.00",
    Capacity: 30,
    "Unsheltered Tables": 2,
    "Sheltered Tables": "",
    ADA: "",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/BeerShevaTables1-2.jpg",
    "Photo Caption 1": "Beer Sheeva Park tables",
    "Photo 2": "",
    "Photo Caption 2": "",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "(http://www.seattle.gov/documents/Departments/ParksAndRecreation/Reserve/Picnic/Beer_Sheva_Map_Directions_2023.pdf)",
    Features: "",
    "Park xID": 63744,
  },
  {
    "Shelter Name": "Benefit Playground Shelter #1",
    Fee: "$160.00",
    Capacity: 35,
    "Unsheltered Tables": 2,
    "Sheltered Tables": 2,
    ADA: "",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/BenefitShelter.JPG",
    "Photo Caption 1": "",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/BenefitPicnicShelter.JPG",
    "Photo Caption 2": "",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "(http://www.seattle.gov/documents/Departments/ParksAndRecreation/Reserve/Picnic/Benefit_Map_Directions_2023.pdf)",
    Features: "",
    "Park xID": 63751,
  },
  {
    "Shelter Name": "Gas Works Park Shelter #2",
    Fee: "$210.00",
    Capacity: 100,
    "Unsheltered Tables": 4,
    "Sheltered Tables": 4,
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/gasworks2-1.jpg",
    "Photo Caption 1": "Gas Works Park Shelter",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/gasworks2-2.jpg",
    "Photo Caption 2": "",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "http://www.seattle.gov//documents/Departments/ParksAndRecreation/Reserve/Picnic/GasWorks2023.pdf",
    Features: "",
    "Park xID": 63937,
  },
  {
    "Shelter Name": "Ferdinand Street Boat Launch Picnic Area Tables Only",
    Fee: "$0.00",
    Capacity: 40,
    "Unsheltered Tables": 3,
    "Sheltered Tables": "",
    ADA: "",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/picnic/FerdinandTable1_2.JPG",
    "Photo Caption 1": "Tables 1 and 2",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/picnic/FerdinandParkTable_2.JPG",
    "Photo Caption 2": "Table 2",
    "Photo 3":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/picnic/FerdinandTables.JPG",
    "Photo Caption 3": "Tables 1, 2 and 3",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "http://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/Ferdinand.pdf",
    Features: "",
    "Park xID": 63720,
  },
  {
    "Shelter Name": "Gas Works Park Shelter #1",
    Fee: "$160.00",
    Capacity: 100,
    "Unsheltered Tables": 5,
    "Sheltered Tables": 2,
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/gasworks1-1.jpg",
    "Photo Caption 1": "Gas Works Park Shelter",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/gasworks1-2.jpg",
    "Photo Caption 2": "",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "http://www.seattle.gov//documents/Departments/ParksAndRecreation/Reserve/Picnic/GasWorks2023.pdf",
    Features: "",
    "Park xID": 63937,
  },
  {
    "Shelter Name": "Carkeek Park Piper's Creek Picnic Area Tables Only",
    Fee: "$25.00",
    Capacity: 100,
    "Unsheltered Tables": 12,
    "Sheltered Tables": "",
    ADA: "",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/CarkeekParkTable37_38_39.jpg",
    "Photo Caption 1": "Carkeek Park Table 37, 38 with 39 in the distance",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/CarkeekParkPipersCreekTable34.jpg",
    "Photo Caption 2":
      "Carkeek Park Piperâs Creek Table 34 With First Come First Serve Table Behind",
    "Photo 3":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/CarkeekParkPipersCreek373839.jpg",
    "Photo Caption 3": "Carkeek Park Piperâs Creek Table 37, 38 and 39",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "http://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/Carkeek.pdf",
    Features: "",
    "Park xID": 63773,
  },
  {
    "Shelter Name": "Carkeek Park Shelter #1",
    Fee: "$120.00",
    Capacity: 190,
    "Unsheltered Tables": 19,
    "Sheltered Tables": "",
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/CarkeekParkTable23.jpg",
    "Photo Caption 1": "Carkeek Park Table 23",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/CarkeekParkViewfromShelter1withSwings.jpg",
    "Photo Caption 2":
      "Carkeek Park Shelter 1 View of Park From Inside of Shelter",
    "Photo 3":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/CarkeekParkShelter1.jpg",
    "Photo Caption 3":
      "Carkeek Park Shelter 1 with 2 Concrete Serving Tables and Benches",
    "Photo 4":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/CarkeekParkPicnicTablesByShelter1.jpg",
    "Photo Caption 4":
      "Carkeek Park Picnic Table Area By Shelter 1 and Fire Circle",
    "Map Link":
      "http://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/Carkeek.pdf",
    Features: "",
    "Park xID": 63773,
  },
  {
    "Shelter Name": "Golden Gardens Park Shelter #1",
    Fee: "$120.00",
    Capacity: 100,
    "Unsheltered Tables": 9,
    "Sheltered Tables": "",
    ADA: "",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/GoldenGardensShelter1Playground.jpg",
    "Photo Caption 1": "Golden Gardens Shelter 1 with Playground in Background",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/GoldenGardensShelter1Tables56.jpg",
    "Photo Caption 2": "Golden Gardens Shelter 1 with Tables 5 & 6",
    "Photo 3":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/GoldenGardensShelter1withTables12.jpg",
    "Photo Caption 3":
      "Golden Gardens Shelter 1 with Tables 1 & 2 in Foreground",
    "Photo 4":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/GoldenGardensBeachNorthMeadow.jpg",
    "Photo Caption 4":
      "Golden Gardens Beach View Near First Come First Serve Fire Pits. Shelter 1 Located South of Bathhouse In the Distance",
    "Map Link":
      "http://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/GoldenGardens.pdf",
    Features: "",
    "Park xID": 63903,
  },
  {
    "Shelter Name": "Golden Gardens Park Shelter #2",
    Fee: "$120.00",
    Capacity: 100,
    "Unsheltered Tables": 8,
    "Sheltered Tables": "",
    ADA: "",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/GoldenGardensShelter2View.jpg",
    "Photo Caption 1": "Shelter 2 View From Inside of Shelter",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/GoldenGardensTable14151617.jpg",
    "Photo Caption 2": "Shelter 2 With Tables 14-17",
    "Photo 3":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/GoldenGardensShelter2South.jpg",
    "Photo Caption 3": "Shelter 2 Facing South",
    "Photo 4":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/GoldenGardensTable11.jpg",
    "Photo Caption 4": "Picnic Table 11 With View Of Golden Gardens Beach",
    "Map Link":
      "http://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/GoldenGardens.pdf",
    Features: "",
    "Park xID": 63903,
  },
  {
    "Shelter Name": "Jefferson Shelter #1",
    Fee: "$185.00",
    Capacity: 50,
    "Unsheltered Tables": "",
    "Sheltered Tables": 3,
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/Jefferson_shelter_1.jpg",
    "Photo Caption 1": "",
    "Photo 2": "",
    "Photo Caption 2": "",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "http://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/Jefferson.pdf",
    Features: "Skate Park",
    "Park xID": 63801,
  },
  {
    "Shelter Name": "Jefferson Shelter #2",
    Fee: "$185.00",
    Capacity: 50,
    "Unsheltered Tables": "",
    "Sheltered Tables": 3,
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/Jefferson_shelter_2.jpg",
    "Photo Caption 1": "Georgetown Shelter #1",
    "Photo 2": "",
    "Photo Caption 2": "",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "http://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/Jefferson.pdf",
    Features: "",
    "Park xID": 63801,
  },
  {
    "Shelter Name": "Jefferson Shelter #3",
    Fee: "$235.00",
    Capacity: 80,
    "Unsheltered Tables": "",
    "Sheltered Tables": 5,
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/JeffersonShelter3SprayPark.jpg",
    "Photo Caption 1": "Jefferson Park Shelter 3 and Spray Feature",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/JeffersonShelter3Playground.jpg",
    "Photo Caption 2": "Jefferson Park Shelter 3 with Playground in Distance",
    "Photo 3":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/ViewJeffersonShelter3.jpg",
    "Photo Caption 3": "View of Jefferson Park Shelter 3",
    "Photo 4":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/JeffersonParkShelterGrassyArea.jpg",
    "Photo Caption 4": "Jefferson Park Shelter 3 with Grassy Area",
    "Map Link":
      "http://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/Jefferson.pdf",
    Features: "",
    "Park xID": 63801,
  },
  {
    "Shelter Name": "John C. Little, Sr. Park Shelter #1",
    Fee: "$160.00",
    Capacity: 40,
    "Unsheltered Tables": "",
    "Sheltered Tables": 2,
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/JohnCLittleShelter1and2.JPG",
    "Photo Caption 1": "Shelter 1 on right side, Shelter 2 on left",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/JohnCLittleShelter1withPlayground.JPG",
    "Photo Caption 2": "Shelter 1 and playground",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "http://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/JohnCLittle.pdf",
    Features: "",
    "Park xID": 63870,
  },
  {
    "Shelter Name": "John C. Little, Sr. Park Shelter #2",
    Fee: "$160.00",
    Capacity: 40,
    "Unsheltered Tables": "",
    "Sheltered Tables": 2,
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/JohnCLittleShelter2.JPG",
    "Photo Caption 1": "John C Little Shelter 2",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/JohnCLittleShelter12.JPG",
    "Photo Caption 2": "Shelter 2 on Left, Shelter 1 on right side",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "http://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/JohnCLittle.pdf",
    Features: "",
    "Park xID": 63870,
  },
  {
    "Shelter Name": "Judkins Park and Playfield Shelter #1",
    Fee: "$185.00",
    Capacity: 150,
    "Unsheltered Tables": 11,
    "Sheltered Tables": 3,
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/JudkinsShelter.jpg",
    "Photo Caption 1": "",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/JudkinsTables1-7.jpg",
    "Photo Caption 2": "Tables 1-7",
    "Photo 3":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/JudkinsTables8-11.jpg",
    "Photo Caption 3": "Tables 8-11",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "http://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/Judkins.pdf",
    Features: "",
    "Park xID": 63873,
  },
  {
    "Shelter Name": "Lincoln Park Shelter #1",
    Fee: "$145.00",
    Capacity: 250,
    "Unsheltered Tables": 22,
    "Sheltered Tables": 1,
    ADA: "",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/Lincoln_Shelter_1.jpg",
    "Photo Caption 1": "",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/Lincoln_Shelt_1.jpg",
    "Photo Caption 2": "",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "http://www.seattle.gov/Documents/Departments/ParksAndRecreation/Reserve/Picnic/Lincoln1-4.pdf",
    Features: "",
    "Park xID": 63806,
  },
  {
    "Shelter Name": "Lincoln Park Shelter #2",
    Fee: "$145.00",
    Capacity: 250,
    "Unsheltered Tables": 21,
    "Sheltered Tables": 1,
    ADA: "",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/Lincoln2-1.jpg",
    "Photo Caption 1": "",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/Lincoln2-2.jpg",
    "Photo Caption 2": "",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "http://www.seattle.gov/Documents/Departments/ParksAndRecreation/Reserve/Picnic/Lincoln1-4.pdf",
    Features: "",
    "Park xID": 63806,
  },
  {
    "Shelter Name": "Lincoln Park Shelter #3",
    Fee: "$195.00",
    Capacity: 90,
    "Unsheltered Tables": 6,
    "Sheltered Tables": 3,
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/Lincoln3-1.jpg",
    "Photo Caption 1": "",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/Lincoln3-2.jpg",
    "Photo Caption 2": "",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "http://www.seattle.gov/Documents/Departments/ParksAndRecreation/Reserve/Picnic/Lincoln1-4.pdf",
    Features: "",
    "Park xID": 63806,
  },
  {
    "Shelter Name": "Lincoln Park Shelter #4",
    Fee: "$170.00",
    Capacity: 90,
    "Unsheltered Tables": 3,
    "Sheltered Tables": 2,
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/Lincoln4-2.jpg",
    "Photo Caption 1": "",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/Lincoln4-2.jpg",
    "Photo Caption 2": "",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "http://www.seattle.gov/Documents/Departments/ParksAndRecreation/Reserve/Picnic/Lincoln1-4.pdf",
    Features: "",
    "Park xID": 63806,
  },
  {
    "Shelter Name": "Lincoln Park Shelter #5",
    Fee: "$220.00",
    Capacity: 300,
    "Unsheltered Tables": 25,
    "Sheltered Tables": 4,
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/Lincoln5-1.jpg",
    "Photo Caption 1": "",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/Lincoln5-2.jpg",
    "Photo Caption 2": "",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "http://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/Lincoln2023.pdf",
    Features: "",
    "Park xID": 63806,
  },
  {
    "Shelter Name": "Madrona Park Shelter #1",
    Fee: "$110.00",
    Capacity: 80,
    "Unsheltered Tables": 7,
    "Sheltered Tables": "",
    ADA: "",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/MadronaBeachShelter.jpg",
    "Photo Caption 1": "Madrona Beach Shelter",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/MadronaBeachTable3.JPG",
    "Photo Caption 2": "Shelter and Table 3",
    "Photo 3":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/MadronaTables1_2_3.JPG",
    "Photo Caption 3": "Shelter with Table 1, 2, 3",
    "Photo 4":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/MadronaTables4_7.JPG",
    "Photo Caption 4": "Tables 4-7",
    "Map Link":
      "http://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/Madrona.pdf",
    Features: "",
    "Park xID": 63818,
  },
  {
    "Shelter Name": "Magnolia Park Shelter #1",
    Fee: "$110.00",
    Capacity: 100,
    "Unsheltered Tables": 10,
    "Sheltered Tables": "",
    ADA: "",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/MagnoliaShelter1.JPG",
    "Photo Caption 1": "Shelter",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/magnolia1-2.jpg",
    "Photo Caption 2": "Shelter and Tables",
    "Photo 3": "",
    "Photo Caption 3": "Tables 6, 7, 8",
    "Photo 4":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/MagnoliaTables.JPG",
    "Photo Caption 4": "Magnolia Tables",
    "Map Link":
      "http://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/Magnolia.pdf",
    Features: "",
    "Park xID": 63823,
  },
  {
    "Shelter Name": "Maple Leaf Reservoir Park Shelter #1",
    Fee: "$210.00",
    Capacity: 100,
    "Unsheltered Tables": "",
    "Sheltered Tables": 4,
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/MapleLeafShelter.JPG",
    "Photo Caption 1": "Maple Leaf Picnic Shelter",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/MapleLeafParkShelter.JPG",
    "Photo Caption 2": "Maple Leaf Park shelter with tower in background",
    "Photo 3":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/MapleLeafPickleBallCourt.JPG",
    "Photo Caption 3": "Shelter and Pickleball courts",
    "Photo 4":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/MapleLeafPlayground.JPG",
    "Photo Caption 4": "Maple Leaf Playground",
    "Map Link":
      "http://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/MapleLeafResevoir.pdf",
    Features: "",
    "Park xID": 63828,
  },
  {
    "Shelter Name": "Matthews Beach Park Picnic Area Tables Only",
    Fee: "$0.00",
    Capacity: 120,
    "Unsheltered Tables": 12,
    "Sheltered Tables": "",
    ADA: "",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/MatthewsBeachPicnicArea.jpg",
    "Photo Caption 1":
      "Matthews Beach Tables 11 and 12 with First Come First Serve Tables",
    "Photo 2":
      "Matthews Beach Table 1 with 2 Grills (http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/MatthewsTables21.jpg)",
    "Photo Caption 2": "Matthews Beach Table 1 with 2 Grills",
    "Photo 3":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/MatthewsBeachTable8.jpg",
    "Photo Caption 3": "Matthews Beach Table 8 with Playground Behind",
    "Photo 4":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/MatthewsBeachParkTable5withFirstComeFirstServeTable.jpg",
    "Photo Caption 4":
      "Matthews Beach Table 5 with First Come First Serve Table",
    "Map Link":
      "http://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/MatthewsBeach.pdf",
    Features: "",
    "Park xID": 63836,
  },
  {
    "Shelter Name": "Me-Kwa-Mooks Park Picnic Area Tables Only",
    Fee: "$0.00",
    Capacity: 30,
    "Unsheltered Tables": 2,
    "Sheltered Tables": "",
    ADA: "",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/MeKwaMooksTables.jpg",
    "Photo Caption 1": "",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/MeKwaMooksTables1-2.jpg",
    "Photo Caption 2": "",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "http://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/Me-Kwa-Mooks.pdf",
    Features: "",
    "Park xID": 63777,
  },
  {
    "Shelter Name": "Meridian Playground Shelter #1",
    Fee: "$310.00",
    Capacity: 100,
    "Unsheltered Tables": "",
    "Sheltered Tables": 8,
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/MeridianShelterinWinter.JPG",
    "Photo Caption 1": "Shelter with Gazebo in front",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/MeridianSideView.JPG",
    "Photo Caption 2": "Meridian Shelter from the side",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "http://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/Meridian.pdf",
    Features: "",
    "Park xID": 63778,
  },
  {
    "Shelter Name": "Northacres Park Picnic Area Tables Only",
    Fee: "$0.00",
    Capacity: 50,
    "Unsheltered Tables": 4,
    "Sheltered Tables": "",
    ADA: "",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/NorthacresTable2.jpg",
    "Photo Caption 1": "Northacres Table 2",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/NorthacresParkTable2withPlayground.jpg",
    "Photo Caption 2": "Northacres Park Table 2 with Playground Behind Hill",
    "Photo 3":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/NorthacresParkTables1and2.jpg",
    "Photo Caption 3": "Northacres Park Table 1 & 2",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "http://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/Northacres.pdf",
    Features: "",
    "Park xID": 63712,
  },
  {
    "Shelter Name": "Othello Playground Picnic Area Tables Only",
    Fee: "$0.00",
    Capacity: 100,
    "Unsheltered Tables": 6,
    "Sheltered Tables": "",
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/OthelloAmphitheaterLawnwithPlayground.JPG",
    "Photo Caption 1": "Amphitheater Lawn with Picnic Area/Playground",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/Othello_2023_Tables1-2.jpg",
    "Photo Caption 2": "Tables 1, 2",
    "Photo 3":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/OthelloParkTables56.JPG",
    "Photo Caption 3": "Tables 5, 6",
    "Photo 4":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/Othello_Tables3-4.jpg",
    "Photo Caption 4": "Tables 3, 4",
    "Map Link":
      "http://www.seattle.gov/documents/Departments/ParksAndRecreation/Reserve/Picnic/Othello_Map_Directions_2023.pdf",
    Features: "",
    "Park xID": 63962,
  },
  {
    "Shelter Name": "Pratt Park Picnic Area Tables Only",
    Fee: "$0.00",
    Capacity: 60,
    "Unsheltered Tables": 5,
    "Sheltered Tables": "",
    ADA: "",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/PrattParkTables1-5.jpg",
    "Photo Caption 1": "Pratt Tables 1-5",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/PrattSprayPark.jpg",
    "Photo Caption 2": "Pratt Spray Park",
    "Photo 3":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/PrattTables3-4.jpg",
    "Photo Caption 3": "Pratt Tables 2 and 3",
    "Photo 4":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/PrattTables4-5.jpg",
    "Photo Caption 4": "Pratt Tables 4 and 5",
    "Map Link":
      "(http://www.seattle.gov/documents/Departments/ParksAndRecreation/Reserve/Picnic/Pratt_MapDirections_2023_newconfig.pdf)",
    Features: "",
    "Park xID": 63957,
  },
  {
    "Shelter Name": "Ravenna Park Shelter #1",
    Fee: "$110.00",
    Capacity: 150,
    "Unsheltered Tables": 10,
    "Sheltered Tables": "",
    ADA: "",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/RavennaShelter_and_Tables1-7.jpg",
    "Photo Caption 1": "Ravenna Tables 1-7",
    "Photo 2": "",
    "Photo Caption 2": "",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "(http://www.seattle.gov/documents/Departments/ParksAndRecreation/Reserve/Picnic/Ravenna_Map_Directions_2023.pdf)",
    Features: "",
    "Park xID": 63942,
  },
  {
    "Shelter Name": "Roxhill Park Picnic Area Tables Only",
    Fee: "$0.00",
    Capacity: 75,
    "Unsheltered Tables": 10,
    "Sheltered Tables": "",
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/RoxhillParkTable10.JPG",
    "Photo Caption 1": "Table 10",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/RoxhillParkTable6.JPG",
    "Photo Caption 2": "Table 6",
    "Photo 3":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/RoxhillTable7.JPG",
    "Photo Caption 3": "Table 7",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "http://www.seattle.gov//Documents/Departments/ParksAndRecreation/Reserve/Picnic/Roxhill.pdf",
    Features: "",
    "Park xID": 64005,
  },
  {
    "Shelter Name": "Seward Park Shelter #1",
    Fee: "$160.00",
    Capacity: 40,
    "Unsheltered Tables": "",
    "Sheltered Tables": 2,
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/seward1-2.jpg",
    "Photo Caption 1": "",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/seward1-3.jpg",
    "Photo Caption 2": "",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "(http://www.seattle.gov/documents/Departments/ParksAndRecreation/Reserve/Picnic/Seward_Map_Directions_2023.pdf)",
    Features: "",
    "Park xID": 64084,
  },
  {
    "Shelter Name": "Seward Park Shelter #2",
    Fee: "$210.00",
    Capacity: 50,
    "Unsheltered Tables": "",
    "Sheltered Tables": "",
    ADA: "",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/picnic/SewardShelter2Front.JPG",
    "Photo Caption 1": "",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/picnic/SewardShelter2.JPG",
    "Photo Caption 2": "",
    "Photo 3":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/picnic/SewardParkShelter_2.JPG",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "(http://www.seattle.gov/documents/Departments/ParksAndRecreation/Reserve/Picnic/Seward_Map_Directions_2023.pdf)",
    Features: "",
    "Park xID": 64084,
  },
  {
    "Shelter Name": "Seward Park Shelter #3",
    Fee: "$310.00",
    Capacity: 300,
    "Unsheltered Tables": 18,
    "Sheltered Tables": 2,
    ADA: "Partial",
    "Photo 1":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/seward3-1.jpg",
    "Photo Caption 1": "",
    "Photo 2":
      "http://www.seattle.gov/images/Departments/ParksAndRecreation/Reserve/Picnic/seward3-2.jpg",
    "Photo Caption 2": "",
    "Photo 3": "",
    "Photo Caption 3": "",
    "Photo 4": "",
    "Photo Caption 4": "",
    "Map Link":
      "(http://www.seattle.gov/documents/Departments/ParksAndRecreation/Reserve/Picnic/Seward_Map_Directions_2023.pdf)",
    Features: "",
    "Park xID": 64084,
  },
];
