const alldata = [];


function verificationIcon(verified) {
    if (verified === true) {
        return `<i class="fa fa-check-circle" aria-hidden="true" style="color: blue;"></i>`;
    } else {

        return "";
    }
}

const ConvertTime = (seconds) => {
    if (seconds == "") {
        return "now";
    }
    else {
        const second = parseFloat(seconds);
        const Hours = Math.floor(second / 3600);
        const Minutes = Math.floor((second % 3600) / 60);
        return `${Hours} hour:${Minutes} munites ago`;
    }
};

const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/videos/categories")
        .then((response) => response.json())
        .then((data) => {
            if (data.status === true) {
                const categoryContainer = document.getElementById("CategoryButtons");
                categoryContainer.innerHTML = "";
                const sortdatas = document.getElementById("sortAllData");
                sortdatas.addEventListener("click", () => sortAlldta());
                data.data.forEach(datas => {
                    const button = document.createElement("button");
                    button.textContent = datas.category;
                    button.addEventListener("click", () => loadAllData(datas.category_id));
                    categoryContainer.appendChild(button);
                });

                // const categoryContainer = document.getElementById("CategoryButtons");
                // // categoryContainer.innerHTML = "";
                // data.data.forEach(datas => {
                //     categoryContainer.innerHTML += `<button onclick="loadAllData(${datas.category_id})">${datas.category}</button>`;
                // });
            }
        });
};

const loadAllData = (id) => {
    alldata.length = 0;
    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
        .then((res) => res.json())
        .then((data) => display(data.data));
    // data.data[0].others.views
};

function display(data) {
    // data.forEach((item) => {
    //     console.log(item);
    // })
    // alldata.length = 0;
    console.log(data);
    const container = document.getElementById("ArrayAllData");
    container.innerHTML = "";
    if (data.length === 0) {
        container.innerHTML = `<img src="C:\Users\User\Desktop\Soumick\Phitron\Semester - 3\Software\W - 2\M - 8\PHero-Tube\Icon.png" alt=""> <p>Sorry, There is no content</p>`;;
    } else {
        // console.log(data);
        // sortdata(data);
        data.forEach(items => {
            // console.log(items);
            alldata.push(items)
            container.innerHTML += `
            <div class="borders">
                <img class="imgs" src="${items.thumbnail}" alt="">
                <p class="time">${ConvertTime(items.others.posted_date)}</p><br><br>
                    <div class="details-container">
                        <div class="profile-pics">
                            <img class="profile-pic" src="${items.authors[0].profile_picture}" alt="">
                        </div>
                        <div>
                            <h6 style="font-size: 20px;">${items.title}</h6>
                            <p class="p-titles">${items.authors[0].profile_name} ${verificationIcon(items.authors[0].verified)}</p>
                            <h6 class="view" >${items.others.views} views</h6>
                        </div>
                    </div>
            </div>
            `;
        });
    }
}

const sortdatas = document.getElementById("sortAllData");
sortdatas.addEventListener("click", () => sortAlldta());

let SortData = false;
function sortAlldta() {

    if (SortData == false) {
        alldata.sort((a, b) => {
            const viewsA = parseInt(a.others.views.replace(/[^0-9]/g, ""));
            const viewsB = parseInt(b.others.views.replace(/[^0-9]/g, ""));
            return viewsB - viewsA;
        });
        display(alldata);
        SortData = true;
    }
    // else if(SortData == true) {
    //     alldata.sort((a, b) => {
    //         // Parse views strings into numbers by removing non-numeric characters
    //         const viewsA = parseInt(a.others.views.replace(/[^0-9]/g, ""));
    //         const viewsB = parseInt(b.others.views.replace(/[^0-9]/g, ""));
    //         // Compare views in descending order
    //         return viewsA - viewsB;
    //     });
    //     display(alldata);
    //     SortData = false;
    // }
}


loadAllData(1000);
loadCategories();
