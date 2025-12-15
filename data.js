const JSON_BIN_BASE_URL = "https://api.jsonbin.io/v3";
const JSON_BIN_ID = "693e4baaae596e708f98b9ed"
const MASTER_KEY = "$2a$10$lDY62TXsZiXEOUQOfoXeEOl/PcbIUeV1uCBeo437y6JibJnV6e8f6";

async function loadData() {
    try {
        const config = {
            "headers": {
                "Content-Type": "application/json",
                "X-Master-Key": MASTER_KEY
            }
        }
        const response = await axios.get(`${JSON_BIN_BASE_URL}/b/${JSON_BIN_ID}/latest`, config);
        return response.data.record;
    } catch (e) {
        return [];
    }
}

async function saveTools(tools) {
    try {
        const config = {
            "headers": {
                "Content-Type": "application/json",
                "X-Master-Key": MASTER_KEY
            }
        }

        const response = await axios.put(`${JSON_BIN_BASE_URL}/b/${JSON_BIN_ID}`, tools, config);
        return response.data;

    } catch (e) {
        return {
            "error": e
        }
    }
}

function addTool(tools, name, quantity, rack) {
    const newTool = {
        "id": Math.floor(Math.random() * 100000 + 1),
        "name": name,
        "quantity": quantity,
        "rack": rack
    }

    tools.push(newTool);
    saveTools(tools);
}

function modifyTool(tools, id, newName, newQuantity, newRack) {
    const modifiedTool = {
        "id": id,
        "name": newName,
        "quantity": newQuantity,
        "rack": newRack
    }

    const indexToReplace = tools.findIndex(function(tool){
        return tool.id == id;
    });

    if (indexToReplace > -1) {
        tools[indexToReplace] = modifiedTool;
        saveTools(tools);
    }
}

function deleteTool(tools, id) {
    let indexToDelete = null;
    for (let i = 0; i < tools.length; i++) {
        if (tools[i].id == id) {
            indexToDelete = i;
            break;
        }
    }
    if (indexToDelete !== null) {
        tools.splice(indexToDelete, 1);
        saveTools(tools);
    } else {
        console.log("Tool is not found");
    }
}

function countTotalItems(tools) {
    return tools.length;
}