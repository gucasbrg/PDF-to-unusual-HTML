var directory = "data/";
var file_name = "test"
var words_file_name = "test_words.txt";

var pdf = pdf({"directory": directory, "file_name": file_name});

var selection = selection({});
var click_down = false;

$(document).ready(function() {
	var url = directory+words_file_name;
	$("#main").html("Loading PDF file");
	$.ajax({
		url: url,
		context: document.body,
		success: function(data){
			$("#main").html("");
			var data = jQuery.parseJSON(data);
			var id = 0;
			for(var i=0; i<data.pages.length; i++) {
				var new_page = page({"id": i});
				new_page.set_width(data.pages[i].width);
				new_page.set_height(data.pages[i].height);
				new_page.set_margin_top(data.pages[i].marginTop);
				id++;
				for(var j=0; j<data.pages[i].lines.length; j++) {
					new_line = line({});
					new_line.set_id(data.pages[i].lines[j].idLine);
					new_line.set_x(data.pages[i].lines[j].x);
					new_line.set_y(data.pages[i].lines[j].y);
					new_line.set_width(data.pages[i].lines[j].width);
					new_line.set_height(data.pages[i].lines[j].height);
					
					for(var k=0; k<data.pages[i].lines[j].words.length; k++) {
						new_word = word({});
						new_word.set_word(data.pages[i].lines[j].words[k].word);
						new_word.set_x(data.pages[i].lines[j].words[k].x);
						new_word.set_width(data.pages[i].lines[j].words[k].width);
						new_line.add_word(new_word);
					}

					new_page.add_line(new_line);
				}

				pdf.add_page(new_page);
			}

			pdf.display_all_pages();
		},
		error: function() {
			$("#main").html("Could not load PDF file");
		}
	});



	$('.selection').live('mousedown', function(e) {
		if (e.which == 1) {
			click_down = true;
			selection.initiate(e.pageX, e.pageY);
		}
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
	});
	$(window).mousemove(function(e) {

		if (click_down == true) {
			selection.update(e.pageX, e.pageY);

			pdf.highlight(selection);
		}
		event.preventDefault ? event.preventDefault() : event.returnValue = false
	});

	$(window).mouseup(function(e) {
		if (e.which == 1) {
			click_down = false;
		}
		event.preventDefault ? event.preventDefault() : event.returnValue = false
	});

});















