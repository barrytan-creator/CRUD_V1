document.addEventListener("DOMContentLoaded", async function(){
    const tools = await loadData();
    console.log(tools);
    
    renderTools(tools);

    document.querySelector("#addTool").addEventListener("click", async function(){
        let name = document.querySelector("#toolName").value;
        let quantity = parseInt(document.querySelector("#toolQuantity").value);
        let rack = document.querySelector("#toolRack").value;
        
        if (name && quantity) {
            addTool(tools, name, quantity, rack);
            renderTools(tools);
            
            document.querySelector("#toolName").value = '';
            document.querySelector("#toolQuantity").value = '';
            document.querySelector("#toolRack").value = '';
        }
    });
});

function renderTools(tools) {
    const toolTableBody = document.querySelector("#toolList");
    toolTableBody.innerHTML = "";
    
    if (tools.length === 0) {
        toolTableBody.innerHTML = "";
        updateTotal(tools);
        return;
    }
    
    for (let t of tools) {
        let trElement = document.createElement('tr');
        trElement.innerHTML = `
            <td>${t.name}</td>
            <td>${t.quantity}</td>
            <td>${t.rack}</td>
            <td>
                <button class="btn pull-btn btn-success btn-sm me-1">Pull</button>
                <button class="btn edit-btn btn-warning btn-sm me-1">Edit</button>
                <button class="btn delete-btn btn-danger btn-sm">Delete</button>
            </td>
        `;
        
        toolTableBody.appendChild(trElement);

        trElement.querySelector(".pull-btn").addEventListener('click', function() {
            const pullQuantity = parseInt(prompt("How many do you want to pull?", "1"));
            if (pullQuantity === null) return;
            
            const currentQuantity = parseInt(t.quantity);
            if (pullQuantity > currentQuantity) {
                alert("Not enough stock!");
                return;
            }
            
            const newQuantity = currentQuantity - pullQuantity;
            modifyTool(tools, t.id, t.name, newQuantity, t.rack);
            renderTools(tools);
        });

        trElement.querySelector(".edit-btn").addEventListener('click', function() {
            const newName = prompt("Enter the new tool name:", t.name);
            if (newName === null) return;
            
            const newQuantity = parseInt(prompt("Enter the new quantity:", t.quantity));
            if (newQuantity === null) return;
            
            const newRack = prompt("Enter the new rack number:", t.rack);
            if (newRack === null) return;
            
            modifyTool(tools, t.id, newName, newQuantity, newRack);
            renderTools(tools);
        });

        trElement.querySelector(".delete-btn").addEventListener('click', function() {
            deleteTool(tools, t.id);
            renderTools(tools);
        });
    }

    updateTotal(tools);
}

function updateTotal(tools) {
    const total = countTotalItems(tools);
    document.querySelector("#totalItems").textContent = total;
}