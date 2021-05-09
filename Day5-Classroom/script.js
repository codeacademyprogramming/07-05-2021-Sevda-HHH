myData = document.getElementById("myData")

function getData() {

    let http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let array = JSON.parse(this.responseText)
            var table = document.getElementById("myData")
            var count = 1;
            for (let i = 0; i < array.length; i++) {
                var hasActive = false;
                var totalMonthlyLoan = 0
                for (let loan = 0; loan < array[i].loans.length; loan++) {
                    if (array[i].loans[loan].closed == false) {
                        hasActive = true;
                        totalMonthlyLoan += array[i].loans[loan].perMonth.value
                    }
                }
                console.log(array[i]);
                var tRow =
                    ` <tr> 
                      <th scope="row">${count}</th>
                      <td><img src="${array[i].img}" alt="${array[i].name + " " + array[i].surname}"></td>
                      <td>${array[i].name}        </td>
                      <td>${array[i].surname} </td> 
                      <td>${array[i].salary.value}  AZN</td> 
                      <td> ${hasActive == true ? "Yes" : "No"}</td>
                      <td> ${totalMonthlyLoan}</td> 
                      <td> ${totalMonthlyLoan < (array[i].salary.value / 100 * 45) ? "Yes" : "No"}</td>  
                      </tr > `
                table.innerHTML += tRow
                count++;
            }
        }
    }

    http.open("GET", "https://api.npoint.io/ec21414b0e15972dbfde/data/");
    http.send();

}

getData()