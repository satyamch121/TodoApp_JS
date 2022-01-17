var arr_of_obj = new Set();
var value_id;
var title_flag = false;
var subtask = new Map;
//main modal when enabled when clicked on add item
function modal(){
    document.getElementById("modal-div").style.display = "block";
};

//calls create object function with provided input when clicked on 'add' button on modal nad closes modal
function addCard(){
    var card_title = document.getElementById("modal-input-box").value;
    createObj(card_title);
    closeModal();
}

//changes the display of modal so as to close it
function closeModal(){
    document.getElementById("modal-div").style.display = "none";
}

//creates a object which stores the info about card and calls create a create card function
function createObj(title){
    document.getElementById('empty-list').style.display = 'none'
    var card_obj = {
        title: title,
        id: Date.now(),
        subtask
    };
    arr_of_obj.add(card_obj);
    createCard(card_obj.id);
};

//adds the provided input from modal as list item in the card clicked
//triggers when clicked on plus icon inside card
//and pops a modal and that modal provides the input
function addList(){
    var cloned_list_item = document.querySelector(".this-list-element").cloneNode(true);
    var card_item = document.getElementById('modal-input-box-card').value;
    console.log(value_id);
    cloned_list_item.innerText =  card_item; 
    cloned_list_item.style.display = "block";
    cloned_list_item.setAttribute('id',`${Date.now()}`);
    cloned_list_item.setAttribute('value',`${Date.now()}`);
    cloned_list_item.setAttribute('style',"margin-left: 10px;");
    var done_button = document.createElement('button');
    done_button.setAttribute('id',`check-done-${Date.now()}`);
    done_button.setAttribute('class','mark-as-done-class');
    done_button.setAttribute('value',`${Date.now()}`);
    done_button.setAttribute('onclick','completedTask(this.value)');
    done_button.innerText = ' mark as done';
    done_button.setAttribute('style','font-size:15 px;cursor:pointer; height:15px; border-radius:5px;')
    //console.log(done_button);
    cloned_list_item.appendChild(done_button);
    //console.log(cloned_list_item);
    cloned_list_item.setAttribute('onClick',"completedTask(this.value)");
    //console.log(document.getElementById(`${value_id}`));
    
    for(obj of arr_of_obj){
        for(prop in obj){
            if(obj.id == value_id){
                obj.subtask.set(`${card_item}`,`${Date.now()}`);
                break;
            }
        }
    }
    //console.log(document.getElementById('check-done'));
    //console.log(done_button);
    //console.log(cloned_list_item);
    //console.log(arr_of_obj);
    document.getElementById(`${value_id}`).getElementsByClassName('add-list-after-this')[0].appendChild(cloned_list_item).appendChild(done_button);
    closeCardModal();
}

//changes the display so as to close modal called after every click on add/close button in modal
//so you can't accidentially add one list twice in card at once!
function closeCardModal(){
    document.getElementById('modal-div-card').style.display = "none";
}

//this function gets triggered when someone clicks on plus button simply making modal appear
//and then when we provide input that add button calls 'addList' function which actually adds
//the provided input in card as a todo item
function addSubtask(val) {
    document.getElementById("modal-div-card").style.display = "block";
    //console.log(val);
    value_id = val;
};

//this function is attached to delete icon inside card when the card is created
//and takes the value as input and when delete icon is clicked
//the value is taken as paramater (i.e which is id for that specific card ) and
//deletes that from our set of objects as well as from the main container
function deleteCard(val){
    var delete_div = document.getElementById(`${val}`);
    //console.log(val);
    for(obj of arr_of_obj){
        for(prop in obj){
        if (obj.id==val)
        arr_of_obj.delete(obj);
        break;
        }
    }
    delete_div.parentNode.removeChild(delete_div);
    if(arr_of_obj.size==0){
        document.getElementById('empty-list').style.display = 'block';
    }
    
    //console.log(arr_of_obj);
};

//function below just checks if main container is empty or not
//so takes the details from the object and creates the card according to user
//clones the template node and then calls display function which will actually create card on main conatiner
function createCard(){
    var first_card = document.querySelector('.card').cloneNode(true);
    display(first_card);
};

//function below is attached to mark as done button and takes value as the paramter
//and then as the same value is attached to text as id it finds that element and 
//changes the font to striked font
function completedTask(value){
    document.getElementById(`${value}`).style.textDecoration = 'line-through';
    document.getElementById(`${value}`).style.color = '#112D4E';
    document.getElementById(`check-done-${value}`).remove();
    //console.log(value);
}

//function below creates the card on main container
//traverses through the set of objects and creates the card
function display(card){
    document.getElementById('empty-list').style.display = 'none'
    arr_of_obj.forEach(element => {
        card.id = element.id;
        card.querySelector(".card-head").innerHTML = element.title;
        card.querySelector(".card-head").setAttribute('value',`${element.id}`);
        card.setAttribute("value",`${element.id}`);
        card.setAttribute("display","block");
        card.setAttribute("min-height","300px");
        card.querySelector(".delete-button-in-card").setAttribute("value",`${element.id}`);
        card.querySelector(".delete-button-in-card").setAttribute("onClick","deleteCard(this.value)");
        card.querySelector(".add-button-in-card").setAttribute("value",`${element.id}`);
        card.querySelector(".add-button-in-card").setAttribute("onClick","addSubtask(this.value)");    
    });
    if(title_flag)
    card.style.display = 'none';
    else
    card.style.display = "block";
    document.getElementById("outer-container").appendChild(card);
}

//when someone click on the head of card this function is triggered
//it changes all the display to none and just makes the selected card as block
function headerFunc(val){
    var card_header;
    //console.log(val);
    //console.log(document.getElementById(`${val}`));
    //console.log(arr_of_obj);
    for(let ele of arr_of_obj){
        for(let id in ele){
            if(ele[id]==val){
                card_header = ele.title;
                break;
            };
        };
    };
    //console.log(card_header);
    document.querySelector("#app-name").style.display = 'none';
    document.querySelector("#add-button-text").style.display = 'none';
    for(let ele of arr_of_obj){
        //console.log(ele.id);
            if(ele.id==val){
                document.getElementById(`${ele.id}`).style.display = 'block';
            }
            else {
                document.getElementById(`${ele.id}`).style.display = 'none';
            }
    };
    document.getElementById('card-dynamic-head').innerText = `${card_header}`;
    document.getElementById('card-dynamic-head').style.display = 'flex'
    document.getElementById('back-button').style.display = 'block'
    title_flag = true;
};

//function below changes all the display to block from the set of objects 
//gets trigerred when go back is clicked (after someone clicks on head of card)
function displayAll(){
    title_flag = false;
    document.querySelector("#app-name").style.display = 'block';
    document.querySelector("#add-button-text").style.display = 'inline-block';
    document.getElementById('back-button').style.display = 'none';
    for(let ele of arr_of_obj){
            document.getElementById(`${ele.id}`).style.display = 'block';
    };
    document.getElementById('card-dynamic-head').innerText = ``;
    document.getElementById('card-dynamic-head').style.display = 'none';
}