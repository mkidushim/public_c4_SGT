var student_array = [];

var student_object = {
    name: null,
    course: null,
    grade: null
};
var first_click = true;
var low_array = [];
var high_array = [];

function add_student() {

        var addstudent = Object.create(student_object);
        addstudent.name = $('#student_name').val();
        addstudent.course = $('#student_course').val();
        addstudent.grade = parseFloat($('#student_grade').val());
        student_array.push(addstudent);
        //show_student();
        console.log(student_object);
        console.log(student_array);
        average_grade();
        //v--------KC Added the Average function to this button
        

    }
    //got the show_student button to work we can also put it inside the add_student button by removing the comment before the show_student() function
function show_student() {

    console.log('button worked')
    


 footer();

    for (var i = 0; i < student_array.length; i++) {
        var output_stud = $('<div>', {
            class: "student_container list-group",
            data_index: i
        });
        var name_o = $('<div>', {
            class: "st_name list-group-item",
            text: student_array[i].name
        });
        var course_o = $('<div>', {
            class: "st_course list-group-item",
            text: student_array[i].course
        });

        var grade_o = $('<div>', {
            class: "st_grade list-group-item",
            text: student_array[i].grade
        });
        var delete_o = $('<button>', {
            class: "delete list-group-item",
            type: "button",
            text: "delete"
        });
        output_stud.on('click',function (){
            var index = $(this).attr('data_index');
            $(this).remove();
            student_array.splice(index,1);
            high_low_grade();

            highlight_low();
            highlight_high();
        })
        $('#student_object').append(output_stud);
        $(output_stud).append(name_o, course_o, grade_o, delete_o);

    }

};



$(document).ready(function() {
    $('.s_add').on('click', add_student);

});

function average_grade() 
{
    var sum = 0;
    var average = 0;
    console.log(student_object);
    console.log(student_array);
    for (var i = 0; i < student_array.length; i++) 
        {
            sum += parseFloat(student_array[i].grade);

        }   
    average = sum / student_array.length;
    console.log('Average: ',average);
    $('#student_display').val(average.toFixed(0));
}

function high_low_grade() 
{   
   
    var high_grade = student_array[0].grade;
    var low_grade = student_array[0].grade;
    var min = 0;
    var max = 0;
    for (var i = 0; i < student_array.length; i++) 
    {
        if (student_array[i].grade === high_grade)
        {
             high_array.push(i);
        }
        if (student_array[i].grade > high_grade)
        {
            high_array = [i];
            high_grade = student_array[i].grade;
        }
        if (student_array[i].grade === low_grade)
        {
             low_array.push(i);
        }
        if (student_array[i].grade < low_grade)
        {
            low_array = [i];
            low_grade = student_array[i].grade;
        }
    }
}
function highlight_low (){
    
    for (var i = 0; i < low_array.length; i++){
        if ($('.st_grade').hasClass('low')){
            return
        }
        $('.st_grade').eq(low_array[i]).addClass('low')
        console.log('low')
    }
}
function highlight_high (){
    for (var i = 0; i < high_array.length; i++) {
        if ($('.st_grade').hasClass('high')){
            return
        }
    $('.st_grade').eq(high_array[i]).addClass('high')
    console.log('high')
   
   
    }


}
function footer () {
     $('.footer').append('<p class="col-sm-3 col-md-3">Pink = Highest Grade in the class.</p>')
         .append('<p class="col-sm-3 col-md-3">Blue = Lowest Grade in the class.</p>')
}


function get_student_data (){
    $.ajax({
        dataType: 'json',
        url: 'http://s-apis.learningfuze.com/sgt/get',
        success: function(response){
            result = response;
            console.log('Response: ', result)
            student_array = student_array.concat(result.data)
                    }

    })
}