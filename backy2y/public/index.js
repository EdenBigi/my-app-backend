console.log("hey loow");
var tbl = document.getElementById("main");
var tblBody = document.getElementById("tbodyid");
async function fetchItems() {
    const results = await fetch('http://localhost:5051/api/items');
    const items = await results.json();
    return items;

}



async function render() {
    const items = await fetchItems();
    console.log(items)
    tblBody.innerHTML = `<tr>
    <th><input type="text" id="brandInput"></th>
    <th><input type="text" id="conditionInput"></th>
    <th><input type="text" id="productTypeInput"></th>
    <th><input type="text" id="whereFromInput"></th>
    <th><input type="text" id="priceInput"></th>
    
</tr>
<tr>
    <th>Brand</th>
    <th>Condition</th>
    <th>ProductType</th>
    <th>Where-From</th>
    <th>Price</th>

</tr>`;
    for (var j = 0; j < items.length; j++) {
        // table row creation
        var row = document.createElement("tr");

        for (var i = 0; i < 6; i++) {
            // create element <td> and text node 
            //Make text node the contents of <td> element
            // put <td> at end of the table row
            var cell = document.createElement("td");
            var cellText;
            //var cellText = document.createTextNode("cell is row " + j + ", column " + i);
            if (i == 0) cellText = document.createTextNode(items[j].brand);
            if (i == 1) cellText = document.createTextNode(items[j].condition);
            if (i == 2) cellText = document.createTextNode(items[j].productType);
            if (i == 3) cellText = document.createTextNode(items[j].whereFrom);
            if (i == 4) cellText = document.createTextNode(items[j].price);
            if (i == 5) {
                cellText = document.createElement(("BUTTON"));
                cellText.id = items[j]._id;
                cellText.innerHTML = "delete";
                cellText.addEventListener("click", () => {
                    console.log(cellText.id)
                    console.log('adda')
                    fetch(`http://localhost:5051/api/items/${cellText.id}`,
                        {
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            method: "DELETE",

                        })
                        .then(() => {
                            render()
                        })
                        .catch(function (res) { console.log(res) })
                })
            }

            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        //row added to end of table body
        tblBody.appendChild(row);
    }

}
render();

document.getElementById('btn').addEventListener("click", addItem);

function addItem() {
    let brand = document.getElementById('brandInput').value;
    let condition = document.getElementById('conditionInput').value;
    let productType = document.getElementById('productTypeInput').value;
    let whereFrom = document.getElementById('whereFromInput').value;
    let price = document.getElementById('priceInput').value;

    fetch("http://localhost:5051/api/items",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ brand, condition, productType, whereFrom, price })
        })
        .then(() => {
            render()
        })
        .catch(function (res) { console.log(res) })
}