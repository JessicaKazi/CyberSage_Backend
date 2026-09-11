require("dotenv").config();

const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

const products = [

    // =========================
    // CPUs
    // =========================

    {
        id: "cpu-001",
        name: "AMD Ryzen 7 7800X3D",
        category: "CPU",
        price: 449,
        stock: 35,
        specs: "Socket: AM5 | Cores: 8 | Threads: 16 | Base Clock: 4.2 GHz | Boost Clock: 5.0 GHz",
        tags: "CPU, AMD, Gaming, Core PC, All",
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea"
    },

    {
        id: "cpu-002",
        name: "AMD Ryzen 5 7600X",
        category: "CPU",
        price: 249,
        stock: 42,
        specs: "Socket: AM5 | Cores: 6 | Threads: 12 | Base Clock: 4.7 GHz | Boost Clock: 5.3 GHz",
        tags: "CPU, AMD, Gaming, Core PC, All",
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea"
    },

    {
        id: "cpu-003",
        name: "AMD Ryzen 9 7950X",
        category: "CPU",
        price: 549,
        stock: 18,
        specs: "Socket: AM5 | Cores: 16 | Threads: 32 | Base Clock: 4.5 GHz | Boost Clock: 5.7 GHz",
        tags: "CPU, AMD, Workstation, Core PC, All",
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea"
    },

    {
        id: "cpu-004",
        name: "Intel Core i7-14700K",
        category: "CPU",
        price: 399,
        stock: 24,
        specs: "Socket: LGA1700 | Cores: 20 | Threads: 28 | Base Clock: 3.4 GHz | Boost Clock: 5.6 GHz",
        tags: "CPU, Intel, Gaming, Core PC, All",
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea"
    },

    {
        id: "cpu-005",
        name: "Intel Core i5-14600K",
        category: "CPU",
        price: 299,
        stock: 31,
        specs: "Socket: LGA1700 | Cores: 14 | Threads: 20 | Base Clock: 3.5 GHz | Boost Clock: 5.3 GHz",
        tags: "CPU, Intel, Gaming, Core PC, All",
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea"
    },


    // =========================
    // GPUs
    // =========================

    {
        id: "gpu-001",
        name: "NVIDIA GeForce RTX 4070",
        category: "GPU",
        price: 599,
        stock: 20,
        specs: "VRAM: 12GB GDDR6X | CUDA Cores: 5888 | Boost Clock: 2.48 GHz",
        tags: "GPU, NVIDIA, Gaming, Graphics, All",
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704"
    },

    {
        id: "gpu-002",
        name: "NVIDIA GeForce RTX 4060",
        category: "GPU",
        price: 299,
        stock: 37,
        specs: "VRAM: 8GB GDDR6 | CUDA Cores: 3072 | Boost Clock: 2.46 GHz",
        tags: "GPU, NVIDIA, Gaming, Graphics, All",
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704"
    },

    {
        id: "gpu-003",
        name: "NVIDIA GeForce RTX 4080 SUPER",
        category: "GPU",
        price: 999,
        stock: 12,
        specs: "VRAM: 16GB GDDR6X | CUDA Cores: 10240 | Boost Clock: 2.55 GHz",
        tags: "GPU, NVIDIA, Gaming, High End, All",
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704"
    },

    {
        id: "gpu-004",
        name: "AMD Radeon RX 7800 XT",
        category: "GPU",
        price: 499,
        stock: 17,
        specs: "VRAM: 16GB GDDR6 | Stream Processors: 3840 | Boost Clock: 2.43 GHz",
        tags: "GPU, AMD, Gaming, Graphics, All",
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704"
    },

    {
        id: "gpu-005",
        name: "AMD Radeon RX 7600",
        category: "GPU",
        price: 269,
        stock: 28,
        specs: "VRAM: 8GB GDDR6 | Stream Processors: 2048 | Boost Clock: 2.65 GHz",
        tags: "GPU, AMD, Gaming, Graphics, All",
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704"
    },


    // =========================
    // RAM
    // =========================

    {
        id: "ram-001",
        name: "Corsair Vengeance 32GB DDR5",
        category: "RAM",
        price: 109,
        stock: 50,
        specs: "Capacity: 32GB | Speed: DDR5-6000 | Kit: 2x16GB",
        tags: "RAM, Memory, Corsair, DDR5, All",
        image: "https://images.unsplash.com/photo-1562976540-1502c2145186"
    },

    {
        id: "ram-002",
        name: "G.Skill Trident Z5 32GB",
        category: "RAM",
        price: 129,
        stock: 32,
        specs: "Capacity: 32GB | Speed: DDR5-6000 | Kit: 2x16GB | RGB",
        tags: "RAM, Memory, G.Skill, DDR5, RGB, All",
        image: "https://images.unsplash.com/photo-1562976540-1502c2145186"
    },

    {
        id: "ram-003",
        name: "Kingston Fury Beast 16GB",
        category: "RAM",
        price: 59,
        stock: 45,
        specs: "Capacity: 16GB | Speed: DDR5-5200 | Kit: 1x16GB",
        tags: "RAM, Memory, Kingston, DDR5, All",
        image: "https://images.unsplash.com/photo-1562976540-1502c2145186"
    },

    {
        id: "ram-004",
        name: "Corsair Vengeance RGB 64GB",
        category: "RAM",
        price: 199,
        stock: 19,
        specs: "Capacity: 64GB | Speed: DDR5-6000 | Kit: 2x32GB | RGB",
        tags: "RAM, Memory, Corsair, DDR5, RGB, All",
        image: "https://images.unsplash.com/photo-1562976540-1502c2145186"
    },

    {
        id: "ram-005",
        name: "TeamGroup T-Force Delta 32GB",
        category: "RAM",
        price: 119,
        stock: 26,
        specs: "Capacity: 32GB | Speed: DDR5-6000 | Kit: 2x16GB | RGB",
        tags: "RAM, Memory, TeamGroup, DDR5, RGB, All",
        image: "https://images.unsplash.com/photo-1562976540-1502c2145186"
    },


    // =========================
    // SSD
    // =========================

    {
        id: "ssd-001",
        name: "Samsung 990 Pro 2TB",
        category: "Storage",
        price: 169,
        stock: 23,
        specs: "Capacity: 2TB | Interface: PCIe 4.0 NVMe | Read: 7450 MB/s",
        tags: "SSD, Storage, Samsung, NVMe, All",
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b"
    },

    {
        id: "ssd-002",
        name: "WD Black SN850X 1TB",
        category: "Storage",
        price: 89,
        stock: 40,
        specs: "Capacity: 1TB | Interface: PCIe 4.0 NVMe | Read: 7300 MB/s",
        tags: "SSD, Storage, WD, NVMe, Gaming, All",
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b"
    },

    {
        id: "ssd-003",
        name: "Crucial P3 Plus 2TB",
        category: "Storage",
        price: 99,
        stock: 34,
        specs: "Capacity: 2TB | Interface: PCIe 4.0 NVMe | Read: 4800 MB/s",
        tags: "SSD, Storage, Crucial, NVMe, All",
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b"
    },

    {
        id: "ssd-004",
        name: "Kingston NV2 1TB",
        category: "Storage",
        price: 69,
        stock: 48,
        specs: "Capacity: 1TB | Interface: PCIe 4.0 NVMe | Read: 3500 MB/s",
        tags: "SSD, Storage, Kingston, NVMe, All",
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b"
    },

    {
        id: "ssd-005",
        name: "Samsung 870 EVO 2TB",
        category: "Storage",
        price: 139,
        stock: 21,
        specs: "Capacity: 2TB | Interface: SATA III | Read: 560 MB/s",
        tags: "SSD, Storage, Samsung, SATA, All",
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b"
    },


    // =========================
    // MOTHERBOARDS
    // =========================

    {
        id: "mb-001",
        name: "ASUS ROG Strix B650E-F",
        category: "Motherboard",
        price: 249,
        stock: 16,
        specs: "Socket: AM5 | Chipset: B650E | Form Factor: ATX | DDR5",
        tags: "Motherboard, ASUS, AMD, AM5, All",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
    },

    {
        id: "mb-002",
        name: "MSI MAG B650 Tomahawk",
        category: "Motherboard",
        price: 219,
        stock: 22,
        specs: "Socket: AM5 | Chipset: B650 | Form Factor: ATX | DDR5",
        tags: "Motherboard, MSI, AMD, AM5, All",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
    },

    {
        id: "mb-003",
        name: "Gigabyte B650 AORUS Elite",
        category: "Motherboard",
        price: 199,
        stock: 18,
        specs: "Socket: AM5 | Chipset: B650 | Form Factor: ATX | DDR5",
        tags: "Motherboard, Gigabyte, AMD, AM5, All",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
    },

    {
        id: "mb-004",
        name: "ASUS TUF Gaming Z790",
        category: "Motherboard",
        price: 289,
        stock: 14,
        specs: "Socket: LGA1700 | Chipset: Z790 | Form Factor: ATX | DDR5",
        tags: "Motherboard, ASUS, Intel, Gaming, All",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
    },

    {
        id: "mb-005",
        name: "MSI PRO Z790-P",
        category: "Motherboard",
        price: 229,
        stock: 20,
        specs: "Socket: LGA1700 | Chipset: Z790 | Form Factor: ATX | DDR5",
        tags: "Motherboard, MSI, Intel, All",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
    },


    // =========================
    // POWER SUPPLIES
    // =========================

    {
        id: "psu-001",
        name: "Corsair RM850e",
        category: "Power Supply",
        price: 129,
        stock: 27,
        specs: "Power: 850W | Efficiency: 80+ Gold | Modular: Fully",
        tags: "PSU, Power Supply, Corsair, 850W, All",
        image: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad"
    },

    {
        id: "psu-002",
        name: "be quiet! Pure Power 12 M 750W",
        category: "Power Supply",
        price: 119,
        stock: 18,
        specs: "Power: 750W | Efficiency: 80+ Gold | Modular: Fully",
        tags: "PSU, Power Supply, be quiet, 750W, All",
        image: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad"
    },

    {
        id: "psu-003",
        name: "Seasonic Focus GX-1000",
        category: "Power Supply",
        price: 179,
        stock: 13,
        specs: "Power: 1000W | Efficiency: 80+ Gold | Modular: Fully",
        tags: "PSU, Power Supply, Seasonic, 1000W, All",
        image: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad"
    },

    {
        id: "psu-004",
        name: "Cooler Master MWE 650W",
        category: "Power Supply",
        price: 79,
        stock: 36,
        specs: "Power: 650W | Efficiency: 80+ Bronze | Modular: Semi",
        tags: "PSU, Power Supply, Cooler Master, 650W, All",
        image: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad"
    },


    // =========================
    // PC CASES
    // =========================

    {
        id: "case-001",
        name: "NZXT H5 Flow",
        category: "PC Case",
        price: 99,
        stock: 25,
        specs: "Form Factor: Mid Tower | Motherboard: ATX | Side Panel: Tempered Glass",
        tags: "Case, NZXT, ATX, Gaming, All",
        image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c"
    },

    {
        id: "case-002",
        name: "Corsair 4000D Airflow",
        category: "PC Case",
        price: 104,
        stock: 30,
        specs: "Form Factor: Mid Tower | Motherboard: ATX | Side Panel: Tempered Glass",
        tags: "Case, Corsair, ATX, Airflow, All",
        image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c"
    },

    {
        id: "case-003",
        name: "Lian Li Lancool III",
        category: "PC Case",
        price: 149,
        stock: 15,
        specs: "Form Factor: Mid Tower | Motherboard: ATX | Side Panel: Tempered Glass",
        tags: "Case, Lian Li, ATX, Gaming, All",
        image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c"
    },

    {
        id: "case-004",
        name: "Fractal Design North",
        category: "PC Case",
        price: 139,
        stock: 17,
        specs: "Form Factor: Mid Tower | Motherboard: ATX | Side Panel: Tempered Glass",
        tags: "Case, Fractal Design, ATX, Design, All",
        image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c"
    },


    // =========================
    // CPU COOLERS
    // =========================

    {
        id: "cooler-001",
        name: "Noctua NH-D15",
        category: "CPU Cooler",
        price: 109,
        stock: 19,
        specs: "Type: Air Cooler | Fans: 2x140mm | Height: 165mm",
        tags: "Cooler, CPU Cooler, Noctua, Air Cooling, All",
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704"
    },

    {
        id: "cooler-002",
        name: "Cooler Master Hyper 212",
        category: "CPU Cooler",
        price: 49,
        stock: 44,
        specs: "Type: Air Cooler | Fan: 120mm | Height: 159mm",
        tags: "Cooler, CPU Cooler, Cooler Master, Air Cooling, All",
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704"
    },

    {
        id: "cooler-003",
        name: "NZXT Kraken 240",
        category: "CPU Cooler",
        price: 139,
        stock: 16,
        specs: "Type: AIO Liquid Cooler | Radiator: 240mm | Fans: 2x120mm",
        tags: "Cooler, CPU Cooler, NZXT, Liquid Cooling, RGB, All",
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704"
    },


    // =========================
    // MONITORS
    // =========================

    {
        id: "monitor-001",
        name: "LG UltraGear 27GN800",
        category: "Monitor",
        price: 299,
        stock: 18,
        specs: "Size: 27 inch | Resolution: 2560x1440 | Refresh Rate: 144Hz",
        tags: "Monitor, LG, Gaming, 144Hz, All",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf"
    },

    {
        id: "monitor-002",
        name: "Samsung Odyssey G5",
        category: "Monitor",
        price: 329,
        stock: 14,
        specs: "Size: 32 inch | Resolution: 2560x1440 | Refresh Rate: 165Hz | Curved",
        tags: "Monitor, Samsung, Gaming, 165Hz, All",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf"
    },

    {
        id: "monitor-003",
        name: "ASUS TUF Gaming VG27AQ",
        category: "Monitor",
        price: 349,
        stock: 12,
        specs: "Size: 27 inch | Resolution: 2560x1440 | Refresh Rate: 165Hz",
        tags: "Monitor, ASUS, Gaming, 165Hz, All",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf"
    }

];


async function seedDatabase() {

    try {

        await client.connect();

        console.log("Connected to MongoDB");


        const db = client.db("Cluster10");

        const collection =
            db.collection("WebProducts");


        console.log("Clearing old products...");

        await collection.deleteMany({});


        console.log(
            `Inserting ${products.length} products...`
        );


        await collection.insertMany(products);


        console.log(
            `Successfully inserted ${products.length} products.`
        );


    } catch (error) {

        console.error(
            "Database seed error:",
            error
        );

    } finally {

        await client.close();

        console.log(
            "MongoDB connection closed."
        );

    }
}


seedDatabase();