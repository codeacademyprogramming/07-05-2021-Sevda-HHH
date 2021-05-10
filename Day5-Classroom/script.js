$(document).ready(function () {

    let http = new XMLHttpRequest();
    http.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            let array = JSON.parse(this.responseText)
            var table = document.getElementById("myData")
            var count = 1;

            // each client on a table 
            function getClients(array) {
                for (let i = 0; i < array.length; i++) {
                    var hasActive = false;
                    var totalMonthlyLoan = 0

                    // checking each loan of a client 
                    for (let loan = 0; loan < array[i].loans.length; loan++) {
                        if (array[i].loans[loan].closed == false) {
                            hasActive = true;
                            totalMonthlyLoan += array[i].loans[loan].perMonth.value
                        }
                    }

                    // adding client row  to the table
                    var tRow =
                        ` <tr ${count % 2 == 0 ? 'class="bg-light"' : " "
                        }> 
                          <th scope="row">${count}</th>
                          <td><img src="${array[i].img}" alt="${array[i].name + " " + array[i].surname}"></td>
                          <td>${array[i].name}        </td>
                          <td>${array[i].surname} </td> 
                          <td>${array[i].salary.value}  AZN</td> 
                          <td> ${hasActive == true ? "Yes" : "No"}</td>
                          <td> ${totalMonthlyLoan} AZN  </td> 

                          <td> ${totalMonthlyLoan < (array[i].salary.value / 100 * 45) ? "Yes" : "No"}</td>  
                          <td style="vertical-align: middle;">  <button type="button" data-num="${i}" class="getDetails btn btn - primary" data-bs-toggle="modal" data-bs-target=".details">
                    Details
                      </button ></td >  
                          </tr > `
                    table.innerHTML += tRow
                    count++;


                }
            }
            getClients(array)

            // filter list by active loans
            $(".form-switch").change(function () {
                $(this).toggleClass("checkedd")
                if ($(this).attr("class") === "form-check form-switch checkedd") {
                    table.innerHTML = " "
                    var count = 1;
                    array.forEach(element => {
                        var countt = 0;

                        element.loans.forEach(loan => {
                            if (loan.closed == false && countt == 0) {
                                countt++;
                                var hasActive = false;
                                var totalMonthlyLoan = 0

                                if (loan.closed == false) {
                                    hasActive = true;
                                    totalMonthlyLoan += loan.perMonth.value
                                }

                                // adding client row  to the table
                                var tR =
                                    ` <tr ${count % 2 == 0 ? 'class="bg-light"' : " "
                                    }> 
                                                  <th scope="row">${count}</th>
                                                  <td><img src="${element.img}" alt="${element.name + " " + element.surname}"></td>
                                                  <td>${element.name}        </td>
                                                  <td>${element.surname} </td> 
                                                  <td>${element.salary.value}  AZN</td> 
                                                  <td> ${hasActive == true ? "Yes" : "No"}</td>
                                                  <td> ${totalMonthlyLoan} AZN  </td> 
                        
                                                  <td> ${totalMonthlyLoan < (element.salary.value / 100 * 45) ? "Yes" : "No"}</td>  
                                                  <td style="vertical-align: middle;">  <button type="button" data-num="${array.length}" class="getDetails btn btn - primary" data-bs-toggle="modal" data-bs-target=".details">
                                            Details
                                              </button ></td >  
                                                  </tr > `

                                table.innerHTML += tR;
                                count++;
                            }

                        })
                    });
                } else {
                    table.innerHTML = " ";
                    getClients(array)
                }
            })

            // loans details modal page
            $("#myData").on("click", ".getDetails", function (e) {
                datanum = $(this).attr("data-num")
                for (let i = 0; i < array.length; i++) {
                    if (datanum == i) {
                        var count = 1;
                        $("#clientData").empty()
                        for (let index = 0; index < array[i].loans.length; index++) {
                            var loan = array[i].loans[index]
                            var tr = `<tr ${count % 2 == 0 ? "class='bg-light'" : " "}>
            <td>${count}</td>
            <td>${loan.loaner}</td>
            <td><b>${loan.amount.value}</b> AZN</td>
            <td>${loan.closed == true ? "Closed" : "Active"}</td>
            <td><b>${loan.dueAmount.value}</b> AZN</td>
            <td>${loan.loanPeriod.start}</td>
            <td>${loan.loanPeriod.end}</td>
            </tr>`
                            var cName = `<p>${array[i].name + " " + array[i].surname + "'s loan details"} </p > `
                            if (count == 1) {
                                $(".modal-title").append(cName)
                            }
                            $("#clientData").append(tr);
                            count++;
                        }
                    }
                }
            })

            $("#seachSubmit").click(function () {
                var inputName = $("#serachVal").val()
                var arr = array.filter(a => (a.name.toLowerCase()).includes(inputName.toLowerCase()) || (a.surname.toLowerCase()).includes(inputName.toLowerCase()))
                table.innerHTML = ' ';

                if (arr.length < 1) {
                    var em = `<div class="w-100 noFount text-danger text-center">Nothing found</div>`;
                    table.innerHTML += em;
                } else {
                    getClients(arr)
                }
            })

        }


    }

    http.open("GET", "https://api.npoint.io/ec21414b0e15972dbfde/data/");
    http.send();


})
