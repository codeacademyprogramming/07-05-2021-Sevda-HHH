myData = document.getElementById("myData")

function getData() {

    let http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let array = JSON.parse(this.responseText)
            var table = document.getElementById("myData")
            for (let i = 0; i < array.length; i++) {
                var aa = [];
                for (let loan = 0; loan < array[i].loans.length; loan++) {
                    var val = (array[i].loans[loan].amount.value)
                    aa.push(val);
                }
                console.log(array[i]);
                var tRow =
                    `  <tr>
                      <th scope="row">${1}</th>
                      <td>${array[i].name}        </td>
                      <td>${array[i].surname} </td> 
                      <td> ${aa}</td> 
                  </tr > `
                table.innerHTML += tRow
            }
        }
    }

    http.open("GET", "https://api.npoint.io/ec21414b0e15972dbfde/data/");
    http.send();

}

getData()