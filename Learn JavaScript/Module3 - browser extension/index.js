let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")

//const deleteBtn = document.getElementById("delete-btn")
//here usage of querySelector
const deleteBtn = document.querySelector("#delete-btn")

const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

function render(leads) {
    // let listItems = ""
    // for (let i = 0; i < leads.length; i++) {
    //     listItems += `
    //         <li>
    //             <a target='_blank' href='${leads[i]}'>
    //                 ${leads[i]}
    //             </a>
    //         </li>
    //     `
    // }
    // ulEl.innerHTML = listItems
    

    //Use createElement() and append() instead of innerHTML
    //approach above is maybe faster because only once (at the end) the DOM will be changed
    ulEl.innerHTML = ""
    for (let i = 0; i < leads.length; i++) {     
        const li = document.createElement("li");

        const anchor = document.createElement("a");
        anchor.href = leads[i];
        anchor.textContent = leads[i];
        anchor.target = "_blank";
        
        li.append(anchor);
        ulEl.append(li);
    }
    

}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})