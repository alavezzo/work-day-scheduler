let now = luxon.DateTime.now()
let today = now.toISODate();
let calendar = luxon.DateTime.now().toLocaleString(luxon.DateTime.DATE_FULL)
tasks = []


let todaysDate = function () {
    localStorage.setItem('today', today)
    $("#currentDay").text(calendar)
}

let loadTasks = function() {
    if (today !== localStorage.getItem('today')) {
        tasks = [];
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    else if (JSON.parse(localStorage.getItem('tasks'))===null){ 
        tasks = [];
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } 
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
        $(".description").each(function(index, el){
            $(this).text(tasks[index])
        })
    }
    todaysDate();
}

let warnings = function() {
        $(".time-block").each(function(index, el){
            auditTask(el);
        })
}

$(".time-block").on("click", "p", function() {
    var text = $(this)
      .text()
      .trim();
    var textInput = $("<textarea>")
      .addClass('description col-10')
      .val(text);
    $(this).replaceWith(textInput);
    textInput.trigger('focus');
  });

$('.time-block').on('blur', 'textarea', function(){
    // get the textarea's current value/text
    var text = $(this)
      .val()
      .trim();
  
    // get the parent ul's id attribute
    // var status = $(this)
    //   .closest('.time-block')
    //   .attr('id')
    //   .replace('list-', '');
  
    // get the task's position in the list of other li elements
    // var index = $(this)
    //   .closest('.time-block-item')
    //   .index();
    
    // tasks[status][index].text = text;
    // saveTasks();
  
    // recreate p element
    var taskP =$('<p>')
      .addClass('description col-10')
      .text(text);
    
    // replace text area with p element
     $(this).replaceWith(taskP);

     saveTasks()

  })

let saveTasks = function() {
    tasks = []
    $(".description").each(function(index, el){
        text = $(this).text().trim()
        tasks.push(text)
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
  

let auditTask = function(taskEl) {
    dt = luxon.DateTime.now();

    if (taskEl.getAttribute('hour') < dt.hour) {
        $(taskEl).removeClass()
        $(taskEl).addClass('row time-block past') 
    } else if (taskEl.getAttribute('hour') > dt.hour) {
    $(taskEl).removeClass()
    $(taskEl).addClass('row time-block future') 
} else { 
    $(taskEl).removeClass()
    $(taskEl).addClass('row time-block present') 
} 
    loadTasks();
}

loadTasks();
warnings();

setInterval(function(){
    $(".time-block").each(function(index, el){
      auditTask(el)
    });
  }, ((1000*60)*30))