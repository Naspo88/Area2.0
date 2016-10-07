$(document).ready(function(){
	var c = 1;
	var fixArch = "A";
	var varArch = 1;
	var consideredId = 0;
	var consideredArchId = 0;
	var background, vis, drag;
	var px, py, dx, dy;
	var dijkstra;
	var startpath, endpath;

	vis = d3.select('svg');

	background = vis.append('rect').attr('class', 'background').attr('width', vis.attr('width')).attr('height', vis.attr('height'));

	/* Initialize db */
	var graph = {
      node: [],
      arch: []
	};

	graph.node = TAFFY();
	graph.arch = TAFFY();

	/* Creation of all node in db and in SVG for example map */
	vis.append('circle').attr('id', '1').attr('class', 'point').attr('r', 10).attr('cx', 105).attr('cy', 30);
	graph.node.insert({id: '1', label: 'START', x: 105, y: 30, note: ''});
	vis.append('circle').attr('id', '2').attr('class', 'point').attr('r', 10).attr('cx', 105).attr('cy', 130);
	graph.node.insert({id: '2', label: 'N2', x: 105, y: 130, note: ''});
	vis.append('circle').attr('id', '3').attr('class', 'point').attr('r', 10).attr('cx', 105).attr('cy', 295);
	graph.node.insert({id: '3', label: 'N3', x: 105, y: 295, note: ''});
	vis.append('circle').attr('id', '4').attr('class', 'point').attr('r', 10).attr('cx', 105).attr('cy', 350);
	graph.node.insert({id: '4', label: 'N4', x: 105, y: 350, note: ''});
	vis.append('circle').attr('id', '5').attr('class', 'point').attr('r', 10).attr('cx', 105).attr('cy', 405);
	graph.node.insert({id: '5', label: 'N5', x: 105, y: 405, note: ''});
	vis.append('circle').attr('id', '6').attr('class', 'point').attr('r', 10).attr('cx', 105).attr('cy', 460);
	graph.node.insert({id: '6', label: 'N6', x: 105, y: 460, note: ''});
	vis.append('circle').attr('id', '7').attr('class', 'point').attr('r', 10).attr('cx', 155).attr('cy', 80);
	graph.node.insert({id: '7', label: 'N7', x: 155, y: 80, note: ''});
	vis.append('circle').attr('id', '8').attr('class', 'point').attr('r', 10).attr('cx', 155).attr('cy', 190);
	graph.node.insert({id: '8', label: 'N8', x: 155, y: 190, note: ''});
	vis.append('circle').attr('id', '9').attr('class', 'point').attr('r', 10).attr('cx', 155).attr('cy', 240);
	graph.node.insert({id: '9', label: 'N9', x: 155, y: 240, note: ''});
	vis.append('circle').attr('id', '10').attr('class', 'point').attr('r', 10).attr('cx', 155).attr('cy', 295);
	graph.node.insert({id: '10', label: 'N10', x: 155, y: 295, note: ''});
	vis.append('circle').attr('id', '11').attr('class', 'point').attr('r', 10).attr('cx', 155).attr('cy', 350);
	graph.node.insert({id: '11', label: 'N11', x: 155, y: 350, note: ''});
	vis.append('circle').attr('id', '12').attr('class', 'point').attr('r', 10).attr('cx', 155).attr('cy', 460);
	graph.node.insert({id: '12', label: 'N12', x: 155, y: 460, note: ''});
	vis.append('circle').attr('id', '13').attr('class', 'point').attr('r', 10).attr('cx', 210).attr('cy', 130);
	graph.node.insert({id: '13', label: 'N13', x: 210, y: 130, note: ''});
	vis.append('circle').attr('id', '14').attr('class', 'point').attr('r', 10).attr('cx', 210).attr('cy', 190);
	graph.node.insert({id: '14', label: 'N14', x: 210, y: 190, note: ''});
	vis.append('circle').attr('id', '15').attr('class', 'point').attr('r', 10).attr('cx', 210).attr('cy', 240);
	graph.node.insert({id: '15', label: 'N15', x: 210, y: 240, note: ''});
	vis.append('circle').attr('id', '16').attr('class', 'point').attr('r', 10).attr('cx', 210).attr('cy', 295);
	graph.node.insert({id: '16', label: 'N16', x: 210, y: 295, note: ''});
	vis.append('circle').attr('id', '17').attr('class', 'point').attr('r', 10).attr('cx', 210).attr('cy', 405);
	graph.node.insert({id: '17', label: 'N17', x: 210, y: 405, note: ''});
	vis.append('circle').attr('id', '18').attr('class', 'point').attr('r', 10).attr('cx', 210).attr('cy', 460);
	graph.node.insert({id: '18', label: 'N18', x: 210, y: 460, note: ''});
	vis.append('circle').attr('id', '19').attr('class', 'point').attr('r', 10).attr('cx', 265).attr('cy', 80);
	graph.node.insert({id: '19', label: 'N19', x: 265, y: 80, note: ''});
	vis.append('circle').attr('id', '20').attr('class', 'point').attr('r', 10).attr('cx', 265).attr('cy', 130);
	graph.node.insert({id: '20', label: 'N20', x: 265, y: 130, note: ''});
	vis.append('circle').attr('id', '21').attr('class', 'point').attr('r', 10).attr('cx', 265).attr('cy', 190);
	graph.node.insert({id: '21', label: 'N21', x: 265, y: 190, note: ''});
	vis.append('circle').attr('id', '22').attr('class', 'point').attr('r', 10).attr('cx', 265).attr('cy', 240);
	graph.node.insert({id: '22', label: 'N22', x: 265, y: 240, note: ''});
	vis.append('circle').attr('id', '23').attr('class', 'point').attr('r', 10).attr('cx', 265).attr('cy', 295);
	graph.node.insert({id: '23', label: 'N23', x: 265, y: 295, note: ''});
	vis.append('circle').attr('id', '24').attr('class', 'point').attr('r', 10).attr('cx', 265).attr('cy', 350);
	graph.node.insert({id: '24', label: 'N24', x: 265, y: 350, note: ''});
	vis.append('circle').attr('id', '25').attr('class', 'point').attr('r', 10).attr('cx', 265).attr('cy', 405);
	graph.node.insert({id: '25', label: 'N25', x: 265, y: 405, note: ''});
	vis.append('circle').attr('id', '26').attr('class', 'point').attr('r', 10).attr('cx', 320).attr('cy', 80);
	graph.node.insert({id: '26', label: 'N26', x: 320, y: 80, note: ''});
	vis.append('circle').attr('id', '27').attr('class', 'point').attr('r', 10).attr('cx', 320).attr('cy', 130);
	graph.node.insert({id: '27', label: 'N27', x: 320, y: 130, note: ''});
	vis.append('circle').attr('id', '28').attr('class', 'point').attr('r', 10).attr('cx', 320).attr('cy', 240);
	graph.node.insert({id: '28', label: 'N28', x: 320, y: 240, note: ''});
	vis.append('circle').attr('id', '29').attr('class', 'point').attr('r', 10).attr('cx', 320).attr('cy', 295);
	graph.node.insert({id: '29', label: 'N29', x: 320, y: 295, note: ''});
	vis.append('circle').attr('id', '30').attr('class', 'point').attr('r', 10).attr('cx', 320).attr('cy', 405);
	graph.node.insert({id: '30', label: 'N30', x: 320, y: 405, note: ''});
	vis.append('circle').attr('id', '31').attr('class', 'point').attr('r', 10).attr('cx', 370).attr('cy', 80);
	graph.node.insert({id: '31', label: 'N31', x: 370, y: 80, note: ''});
	vis.append('circle').attr('id', '32').attr('class', 'point').attr('r', 10).attr('cx', 370).attr('cy', 130);
	graph.node.insert({id: '32', label: 'N32', x: 370, y: 130, note: ''});
	vis.append('circle').attr('id', '33').attr('class', 'point').attr('r', 10).attr('cx', 370).attr('cy', 190);
	graph.node.insert({id: '33', label: 'N33', x: 370, y: 190, note: ''});
	vis.append('circle').attr('id', '34').attr('class', 'point').attr('r', 10).attr('cx', 370).attr('cy', 240);
	graph.node.insert({id: '34', label: 'N34', x: 370, y: 240, note: ''});
	vis.append('circle').attr('id', '35').attr('class', 'point').attr('r', 10).attr('cx', 370).attr('cy', 295);
	graph.node.insert({id: '35', label: 'N35', x: 370, y: 295, note: ''});
	vis.append('circle').attr('id', '36').attr('class', 'point').attr('r', 10).attr('cx', 370).attr('cy', 350);
	graph.node.insert({id: '36', label: 'N36', x: 370, y: 350, note: ''});
	vis.append('circle').attr('id', '37').attr('class', 'point').attr('r', 10).attr('cx', 370).attr('cy', 405);
	graph.node.insert({id: '37', label: 'N37', x: 370, y: 405, note: ''});
	vis.append('circle').attr('id', '38').attr('class', 'point').attr('r', 10).attr('cx', 370).attr('cy', 460);
	graph.node.insert({id: '38', label: 'N38', x: 370, y: 460, note: ''});
	vis.append('circle').attr('id', '39').attr('class', 'point').attr('r', 10).attr('cx', 425).attr('cy', 80);
	graph.node.insert({id: '39', label: 'N39', x: 425, y: 80, note: ''});
	vis.append('circle').attr('id', '40').attr('class', 'point').attr('r', 10).attr('cx', 425).attr('cy', 190);
	graph.node.insert({id: '40', label: 'N40', x: 425, y: 190, note: ''});
	vis.append('circle').attr('id', '41').attr('class', 'point').attr('r', 10).attr('cx', 425).attr('cy', 240);
	graph.node.insert({id: '41', label: 'N41', x: 425, y: 240, note: ''});
	vis.append('circle').attr('id', '42').attr('class', 'point').attr('r', 10).attr('cx', 425).attr('cy', 295);
	graph.node.insert({id: '42', label: 'N42', x: 425, y: 295, note: ''});
	vis.append('circle').attr('id', '43').attr('class', 'point').attr('r', 10).attr('cx', 425).attr('cy', 350);
	graph.node.insert({id: '43', label: 'N43', x: 425, y: 350, note: ''});
	vis.append('circle').attr('id', '44').attr('class', 'point').attr('r', 10).attr('cx', 425).attr('cy', 405);
	graph.node.insert({id: '44', label: 'N44', x: 425, y: 405, note: ''});
	vis.append('circle').attr('id', '45').attr('class', 'point').attr('r', 10).attr('cx', 425).attr('cy', 460);
	graph.node.insert({id: '45', label: 'N45', x: 425, y: 460, note: ''});
	vis.append('circle').attr('id', '46').attr('class', 'point').attr('r', 10).attr('cx', 480).attr('cy', 80);
	graph.node.insert({id: '46', label: 'N46', x: 480, y: 80, note: ''});
	vis.append('circle').attr('id', '47').attr('class', 'point').attr('r', 10).attr('cx', 480).attr('cy', 240);
	graph.node.insert({id: '47', label: 'N47', x: 480, y: 240, note: ''});
	vis.append('circle').attr('id', '48').attr('class', 'point').attr('r', 10).attr('cx', 480).attr('cy', 295);
	graph.node.insert({id: '48', label: 'N48', x: 480, y: 295, note: ''});
	vis.append('circle').attr('id', '49').attr('class', 'point').attr('r', 10).attr('cx', 480).attr('cy', 350);
	graph.node.insert({id: '49', label: 'N49', x: 480, y: 350, note: ''});
	vis.append('circle').attr('id', '50').attr('class', 'point').attr('r', 10).attr('cx', 480).attr('cy', 500);
	graph.node.insert({id: '50', label: 'END', x: 480, y: 500, note: ''});

	/* Creation of all links in db and in SVG for example map */
	vis.append("line").attr('id', 'A1').attr('class', 'allLine').attr('x1', 105).attr('y1', 30).attr('x2', 105).attr('y2', 130).attr('stroke', 'black');
	graph.arch.insert({id: 'A1', start: 'START', end: 'N2', len: 100, note: ''});
	vis.append("line").attr('id', 'A2').attr('class', 'allLine').attr('x1', 105).attr('y1', 130).attr('x2', 105).attr('y2', 295).attr('stroke', 'black');
	graph.arch.insert({id: 'A2', start: 'N2', end: 'N3', len: 165, note: ''});
	vis.append("line").attr('id', 'A3').attr('class', 'allLine').attr('x1', 105).attr('y1', 130).attr('x2', 210).attr('y2', 130).attr('stroke', 'black');
	graph.arch.insert({id: 'A3', start: 'N2', end: 'N13', len: 105, note: ''});
	vis.append("line").attr('id', 'A4').attr('class', 'allLine').attr('x1', 105).attr('y1', 295).attr('x2', 155).attr('y2', 295).attr('stroke', 'black');
	graph.arch.insert({id: 'A4', start: 'N3', end: 'N10', len: 50, note: ''});
	vis.append("line").attr('id', 'A5').attr('class', 'allLine').attr('x1', 105).attr('y1', 350).attr('x2', 155).attr('y2', 350).attr('stroke', 'black');
	graph.arch.insert({id: 'A5', start: 'N4', end: 'N11', len: 50, note: ''});
	vis.append("line").attr('id', 'A6').attr('class', 'allLine').attr('x1', 105).attr('y1', 405).attr('x2', 210).attr('y2', 405).attr('stroke', 'black');
	graph.arch.insert({id: 'A6', start: 'N5', end: 'N17', len: 105, note: ''});
	vis.append("line").attr('id', 'A7').attr('class', 'allLine').attr('x1', 105).attr('y1', 405).attr('x2', 105).attr('y2', 460).attr('stroke', 'black');
	graph.arch.insert({id: 'A7', start: 'N5', end: 'N6', len: 55, note: ''});
	vis.append("line").attr('id', 'A8').attr('class', 'allLine').attr('x1', 105).attr('y1', 460).attr('x2', 155).attr('y2', 460).attr('stroke', 'black');
	graph.arch.insert({id: 'A8', start: 'N6', end: 'N12', len: 50, note: ''});
	vis.append("line").attr('id', 'A9').attr('class', 'allLine').attr('x1', 155).attr('y1', 80).attr('x2', 265).attr('y2', 80).attr('stroke', 'black');
	graph.arch.insert({id: 'A9', start: 'N7', end: 'N19', len: 110, note: ''});
	vis.append("line").attr('id', 'A10').attr('class', 'allLine').attr('x1', 155).attr('y1', 190).attr('x2', 210).attr('y2', 190).attr('stroke', 'black');
	graph.arch.insert({id: 'A10', start: 'N8', end: 'N14', len: 55, note: ''});
	vis.append("line").attr('id', 'A11').attr('class', 'allLine').attr('x1', 155).attr('y1', 240).attr('x2', 210).attr('y2', 240).attr('stroke', 'black');
	graph.arch.insert({id: 'A11', start: 'N9', end: 'N15', len: 55, note: ''});
	vis.append("line").attr('id', 'A12').attr('class', 'allLine').attr('x1', 155).attr('y1', 240).attr('x2', 155).attr('y2', 295).attr('stroke', 'black');
	graph.arch.insert({id: 'A12', start: 'N9', end: 'N10', len: 55, note: ''});
	vis.append("line").attr('id', 'A13').attr('class', 'allLine').attr('x1', 155).attr('y1', 295).attr('x2', 155).attr('y2', 350).attr('stroke', 'black');
	graph.arch.insert({id: 'A13', start: 'N10', end: 'N11', len: 55, note: ''});
	vis.append("line").attr('id', 'A14').attr('class', 'allLine').attr('x1', 210).attr('y1', 130).attr('x2', 265).attr('y2', 130).attr('stroke', 'black');
	graph.arch.insert({id: 'A14', start: 'N13', end: 'N20', len: 55, note: ''});
	vis.append("line").attr('id', 'A15').attr('class', 'allLine').attr('x1', 210).attr('y1', 130).attr('x2', 210).attr('y2', 190).attr('stroke', 'black');
	graph.arch.insert({id: 'A15', start: 'N13', end: 'N14', len: 60, note: ''});
	vis.append("line").attr('id', 'A16').attr('class', 'allLine').attr('x1', 210).attr('y1', 295).attr('x2', 265).attr('y2', 295).attr('stroke', 'black');
	graph.arch.insert({id: 'A16', start: 'N16', end: 'N23', len: 55, note: ''});
	vis.append("line").attr('id', 'A17').attr('class', 'allLine').attr('x1', 210).attr('y1', 295).attr('x2', 210).attr('y2', 405).attr('stroke', 'black');
	graph.arch.insert({id: 'A17', start: 'N16', end: 'N17', len: 110, note: ''});
	vis.append("line").attr('id', 'A18').attr('class', 'allLine').attr('x1', 210).attr('y1', 405).attr('x2', 210).attr('y2', 460).attr('stroke', 'black');
	graph.arch.insert({id: 'A18', start: 'N17', end: 'N18', len: 55, note: ''});
	vis.append("line").attr('id', 'A19').attr('class', 'allLine').attr('x1', 210).attr('y1', 460).attr('x2', 370).attr('y2', 460).attr('stroke', 'black');
	graph.arch.insert({id: 'A19', start: 'N18', end: 'N38', len: 160, note: ''});
	vis.append("line").attr('id', 'A20').attr('class', 'allLine').attr('x1', 265).attr('y1', 80).attr('x2', 265).attr('y2', 130).attr('stroke', 'black');
	graph.arch.insert({id: 'A20', start: 'N19', end: 'N20', len: 50, note: ''});
	vis.append("line").attr('id', 'A21').attr('class', 'allLine').attr('x1', 265).attr('y1', 130).attr('x2', 265).attr('y2', 190).attr('stroke', 'black');
	graph.arch.insert({id: 'A21', start: 'N20', end: 'N21', len: 60, note: ''});
	vis.append("line").attr('id', 'A22').attr('class', 'allLine').attr('x1', 265).attr('y1', 190).attr('x2', 370).attr('y2', 190).attr('stroke', 'black');
	graph.arch.insert({id: 'A22', start: 'N21', end: 'N33', len: 105, note: ''});
	vis.append("line").attr('id', 'A23').attr('class', 'allLine').attr('x1', 265).attr('y1', 240).attr('x2', 320).attr('y2', 240).attr('stroke', 'black');
	graph.arch.insert({id: 'A23', start: 'N22', end: 'N28', len: 55, note: ''});
	vis.append("line").attr('id', 'A24').attr('class', 'allLine').attr('x1', 265).attr('y1', 295).attr('x2', 265).attr('y2', 350).attr('stroke', 'black');
	graph.arch.insert({id: 'A24', start: 'N23', end: 'N24', len: 55, note: ''});
	vis.append("line").attr('id', 'A25').attr('class', 'allLine').attr('x1', 265).attr('y1', 350).attr('x2', 370).attr('y2', 350).attr('stroke', 'black');
	graph.arch.insert({id: 'A25', start: 'N24', end: 'N36', len: 105, note: ''});
	vis.append("line").attr('id', 'A26').attr('class', 'allLine').attr('x1', 265).attr('y1', 350).attr('x2', 265).attr('y2', 405).attr('stroke', 'black');
	graph.arch.insert({id: 'A26', start: 'N24', end: 'N25', len: 55, note: ''});
	vis.append("line").attr('id', 'A27').attr('class', 'allLine').attr('x1', 265).attr('y1', 405).attr('x2', 320).attr('y2', 405).attr('stroke', 'black');
	graph.arch.insert({id: 'A27', start: 'N25', end: 'N30', len: 55, note: ''});
	vis.append("line").attr('id', 'A28').attr('class', 'allLine').attr('x1', 320).attr('y1', 80).attr('x2', 370).attr('y2', 80).attr('stroke', 'black');
	graph.arch.insert({id: 'A28', start: 'N26', end: 'N31', len: 50, note: ''});
	vis.append("line").attr('id', 'A29').attr('class', 'allLine').attr('x1', 320).attr('y1', 80).attr('x2', 320).attr('y2', 130).attr('stroke', 'black');
	graph.arch.insert({id: 'A29', start: 'N26', end: 'N27', len: 50, note: ''});
	vis.append("line").attr('id', 'A30').attr('class', 'allLine').attr('x1', 320).attr('y1', 130).attr('x2', 370).attr('y2', 130).attr('stroke', 'black');
	graph.arch.insert({id: 'A30', start: 'N27', end: 'N32', len: 50, note: ''});
	vis.append("line").attr('id', 'A31').attr('class', 'allLine').attr('x1', 320).attr('y1', 240).attr('x2', 370).attr('y2', 240).attr('stroke', 'black');
	graph.arch.insert({id: 'A31', start: 'N28', end: 'N34', len: 50, note: ''});
	vis.append("line").attr('id', 'A32').attr('class', 'allLine').attr('x1', 320).attr('y1', 240).attr('x2', 320).attr('y2', 295).attr('stroke', 'black');
	graph.arch.insert({id: 'A32', start: 'N28', end: 'N29', len: 55, note: ''});
	vis.append("line").attr('id', 'A33').attr('class', 'allLine').attr('x1', 370).attr('y1', 130).attr('x2', 370).attr('y2', 190).attr('stroke', 'black');
	graph.arch.insert({id: 'A33', start: 'N32', end: 'N33', len: 60, note: ''});
	vis.append("line").attr('id', 'A34').attr('class', 'allLine').attr('x1', 370).attr('y1', 190).attr('x2', 425).attr('y2', 190).attr('stroke', 'black');
	graph.arch.insert({id: 'A34', start: 'N33', end: 'N40', len: 55, note: ''});
	vis.append("line").attr('id', 'A35').attr('class', 'allLine').attr('x1', 370).attr('y1', 190).attr('x2', 370).attr('y2', 240).attr('stroke', 'black');
	graph.arch.insert({id: 'A35', start: 'N33', end: 'N34', len: 50, note: ''});
	vis.append("line").attr('id', 'A36').attr('class', 'allLine').attr('x1', 370).attr('y1', 295).attr('x2', 425).attr('y2', 295).attr('stroke', 'black');
	graph.arch.insert({id: 'A36', start: 'N35', end: 'N42', len: 55, note: ''});
	vis.append("line").attr('id', 'A37').attr('class', 'allLine').attr('x1', 370).attr('y1', 295).attr('x2', 370).attr('y2', 350).attr('stroke', 'black');
	graph.arch.insert({id: 'A37', start: 'N35', end: 'N36', len: 55, note: ''});
	vis.append("line").attr('id', 'A38').attr('class', 'allLine').attr('x1', 370).attr('y1', 405).attr('x2', 425).attr('y2', 405).attr('stroke', 'black');
	graph.arch.insert({id: 'A38', start: 'N37', end: 'N44', len: 55, note: ''});
	vis.append("line").attr('id', 'A39').attr('class', 'allLine').attr('x1', 370).attr('y1', 405).attr('x2', 370).attr('y2', 460).attr('stroke', 'black');
	graph.arch.insert({id: 'A39', start: 'N37', end: 'N38', len: 55, note: ''});
	vis.append("line").attr('id', 'A40').attr('class', 'allLine').attr('x1', 370).attr('y1', 460).attr('x2', 425).attr('y2', 460).attr('stroke', 'black');
	graph.arch.insert({id: 'A40', start: 'N38', end: 'N45', len: 55, note: ''});
	vis.append("line").attr('id', 'A41').attr('class', 'allLine').attr('x1', 425).attr('y1', 80).attr('x2', 480).attr('y2', 80).attr('stroke', 'black');
	graph.arch.insert({id: 'A41', start: 'N39', end: 'N46', len: 55, note: ''});
	vis.append("line").attr('id', 'A42').attr('class', 'allLine').attr('x1', 425).attr('y1', 80).attr('x2', 425).attr('y2', 190).attr('stroke', 'black');
	graph.arch.insert({id: 'A42', start: 'N39', end: 'N40', len: 110, note: ''});
	vis.append("line").attr('id', 'A43').attr('class', 'allLine').attr('x1', 425).attr('y1', 240).attr('x2', 480).attr('y2', 240).attr('stroke', 'black');
	graph.arch.insert({id: 'A43', start: 'N41', end: 'N47', len: 55, note: ''});
	vis.append("line").attr('id', 'A44').attr('class', 'allLine').attr('x1', 425).attr('y1', 240).attr('x2', 425).attr('y2', 295).attr('stroke', 'black');
	graph.arch.insert({id: 'A44', start: 'N41', end: 'N42', len: 55, note: ''});
	vis.append("line").attr('id', 'A45').attr('class', 'allLine').attr('x1', 425).attr('y1', 350).attr('x2', 425).attr('y2', 405).attr('stroke', 'black');
	graph.arch.insert({id: 'A45', start: 'N43', end: 'N44', len: 55, note: ''});
	vis.append("line").attr('id', 'A46').attr('class', 'allLine').attr('x1', 425).attr('y1', 350).attr('x2', 480).attr('y2', 350).attr('stroke', 'black');
	graph.arch.insert({id: 'A46', start: 'N43', end: 'N49', len: 55, note: ''});
	vis.append("line").attr('id', 'A47').attr('class', 'allLine').attr('x1', 480).attr('y1', 80).attr('x2', 480).attr('y2', 240).attr('stroke', 'black');
	graph.arch.insert({id: 'A47', start: 'N46', end: 'N47', len: 160, note: ''});
	vis.append("line").attr('id', 'A48').attr('class', 'allLine').attr('x1', 480).attr('y1', 295).attr('x2', 480).attr('y2', 350).attr('stroke', 'black');
	graph.arch.insert({id: 'A48', start: 'N48', end: 'N49', len: 55, note: ''});
	vis.append("line").attr('id', 'A49').attr('class', 'allLine').attr('x1', 480).attr('y1', 350).attr('x2', 480).attr('y2', 500).attr('stroke', 'black');
	graph.arch.insert({id: 'A49', start: 'N49', end: 'END', len: 150, note: ''});

	function ArchFindStart(gra, asd) {
		var as = [];

		for (var i = 0; i < gra.arch({start: asd}).get(0).length; i++) {
			as[i] = gra.arch({start: asd}).get(0)[i].id;
		}
		return as;
	}

	function ArchFindEnd(gra, asd) {
		var ae = [];

		for (var i = 0; i < gra.arch({end: asd}).get(0).length; i++) {
			ae[i] = gra.arch({end: asd}).get(0)[i].id;
		}
		return ae;
	}

	function Map (gra) {
		
		var road;
		var nameConsNode, start, end;
		
		road = "{";
		for (var i = 0; i < gra.node().get(0).length; i++) {

			nameConsNode = gra.node().get()[i].label;
			start = ArchFindStart(gra, nameConsNode);
			end = ArchFindEnd(gra, nameConsNode);

			road = road + gra.node().get()[i].label + ":{"; 
			
			for (var j = 0; j < start.length; j++ ) {
				if ( j != start.length - 1) {
					road = road + gra.arch({id: start[j]}).first().end + ": " + gra.arch({id: start[j]}).first().len + ", ";
				} else {
					road = road + gra.arch({id: start[j]}).first().end + ": " + gra.arch({id: start[j]}).first().len;
				}
			}
			if (start.length != 0 && end.length != 0) {
				road = road + ", ";
			}
			for (var j = 0; j < end.length; j++ ) {
				if (j != end.length - 1) {
					road = road + gra.arch({id: end[j]}).first().start + ": " + gra.arch({id: end[j]}).first().len + ", ";
				} else {
					road = road + gra.arch({id: end[j]}).first().start + ": " + gra.arch({id: end[j]}).first().len
				}
			}
			road = road + "}";
			if (i != gra.node().get(0).length - 1) {
				road = road + ","
			}
		}

		road = road + "}";

		road = JSON.stringify(eval("("+ road +")"));

		var arrayroad = JSON.parse(road);
		return arrayroad;
	}

	function lenXY (a, b) {
		var f;
		if (a >= b) {
			f = a - b;
		} else {
			f = b - a;
		}
		return f;
	}

	function ArchLength (px, py, dx, dy) {
		var l, lx, ly;
		// Take the max and min for x and y
		lx = lenXY(px, dx);
		ly = lenXY(py, dy);
		var sum = Math.pow(lx, 2) + Math.pow(ly, 2);
		l = Math.sqrt(sum);
		return parseInt(l);
	}

	/* On click of Manage Node*/
	$("#node").click(function() {
		$('#create').css("display", "none");
		$('#menagenode').css("display", "block");
	});

	/* On click of Admin Interface */
	$("#admininterface").click(function(){
		$('#create').css("display", "block");
		$("#SelInterface").css("display", "none");
	});

	$("#choiseinterface").click(function(){
		$('#create').css("display", "none");
		$("#SelInterface").css("display", "block");
	});

	/* On click of New Node*/
	$("#newnode").click(function(){
		$('#menagenode').css("display", "none");
		$('#createnode').css("display", "block");
		
		drag = d3.behavior.drag().on('drag', function() {
			$('#x').val(parseInt(d3.event.x));
			$('#y').val(parseInt(d3.event.y));
	    	/* move the circle */      
	    	return d3.select(this).attr('cx', d3.event.x).attr('cy', d3.event.y);
	 	});
	    vis.append('circle').attr('id', c).attr('class', 'created').attr('r', 10).attr('cx', 50).attr('cy', 40).style("fill", "red").call(drag);
	    $('#assignedId').val(c);
	    $('#x').val("50");
	    $('#y').val("40");
	    $('#label').val("N" + c);
		$('#note').val("");
	});

	/* On click of Save Node */
	$("#savenode").click(function(){
		$('#createnode').css("display", "none");
		$('#create').css("display", "block");
		var id = $('#assignedId').val();
		var x = $('#x').val();
		var y = $('#y').val();
		var label = $('#label').val();
		var note = $('#note').val();

		var nodeDel = vis.select(".created");
		nodeDel.remove();

		graph.node.insert({id: id, label: label, x: x, y: y, note: note});

		vis.append('circle').attr('id', c).attr('class', 'point').attr('r', 10).attr('cx', x).attr('cy', y);

		//graph.node().each(function (r) {console.log(r)});
		c++;

		$('#assignedId').val("");
		$('#x').val("");
		$('#y').val("");
		$('#label').val("");
		$('#note').val("");
	});

	/* On click of Cancel on New Node */
	$('#goBackNewNode').click(function(){
		$('#createnode').css("display", "none");
		$('#create').css("display", "block");

		var nodeDel = vis.select(".created");
		nodeDel.remove();

		$('#assignedId').val("");
		$('#x').val("");
		$('#y').val("");
		$('#label').val("");
		$('#note').val("");
	});

	/* On click of Modify Node*/
	$("#modnode").click(function(){
		if(graph.node().distinct("id").length >= 1) {
			$('#menagenode').css("display", "none");
			$('#modifynode').css("display", "block");

			$('.point').css("fill", "green");

			var allCircles = vis.selectAll('circle');
	       
			$(allCircles[0]).bind('click', function(){
				consideredId = this.id;
				$('#assignedIdOnMod').val(this.id);
				$('#xOnMod').val(graph.node({id: this.id}).first().x);
				$('#yOnMod').val(graph.node({id: this.id}).first().y);
				$('#labelOnMod').val(graph.node({id: this.id}).first().label);
				$('#noteOnMod').val(graph.node({id: this.id}).first().note);
				drag = d3.behavior.drag().on('drag', function() {
					$('#xOnMod').val(parseInt(d3.event.x));
					$('#yOnMod').val(parseInt(d3.event.y));
		    		/* move the circle */      
		    		return d3.select(this).attr('cx', d3.event.x).attr('cy', d3.event.y);
		 		});
				d3.select(this).style("fill", "red").attr("class", "selected").call(drag);
				$('.point').css("fill", "blue");
				$(allCircles[0]).unbind('click');
			});
		} else {
			alert("You have to create at least one node for modifying nodes")
		}
	});

	/* On click of Save Node of Modify */
	$('#modifySelNode').click(function(){
		$('#modifynode').css("display", "none");
		$('#create').css("display", "block");

		var idOM = $('#assignedIdOnMod').val();
		var xOM = $('#xOnMod').val();
		var yOM = $('#yOnMod').val();
		var labelOM = $('#labelOnMod').val();
		var noteOM = $('#noteOnMod').val();

		var modifynode = vis.select('.selected');
		modifynode.remove();

		
		graph.node({id: idOM}).remove();
		graph.node.insert({id: idOM, label: labelOM, x: xOM, y: yOM, note: noteOM});

		vis.append('circle').attr('id', idOM).attr('class', 'point').attr('r', 10).attr('cx', xOM).attr('cy', yOM);
		$('.point').css("fill", "blue");

		$('#assignedIdOnMod').val("");
		$('#xOnMod').val("");
		$('#yOnMod').val("");
		$('#labelOnMod').val("");
		$('#noteOnMod').val("");

		graph.node().each(function (r) {console.log(r)});
	});


	/* On click of Delete Node of Modify */
	$('#deleteSelNode').click(function(){
		$('#modifynode').css("display", "none");
		$('#create').css("display", "block");

		var deletenode = vis.select('.selected');
		var idOM = $('#assignedIdOnMod').val();
			
		var DelArchS = graph.arch({start:graph.node({id: idOM}).first().label}).get();
		var DelArchE = graph.arch({end:graph.node({id: idOM}).first().label}).get();
			
		for(var i=0; i<graph.arch({start:graph.node({id: idOM}).first().label}).count();i++){
			element = document.getElementById(DelArchS[i].id);
			if(element)element.parentNode.removeChild(element);
		}

		for(var i=0; i<graph.arch({end:graph.node({id: idOM}).first().label}).count();i++){
			element = document.getElementById(DelArchE[i].id);
			if(element)element.parentNode.removeChild(element);
		}

		graph.arch({start:graph.node({id: this.id}).first().label}).remove();
		graph.arch({end:graph.node({id: this.id}).first().label}).remove();

		deletenode.remove();
		graph.node({id: idOM}).remove();

		$('#assignedIdOnMod').val("");
		$('#xOnMod').val("");
		$('#yOnMod').val("");
		$('#labelOnMod').val("");
		$('#noteOnMod').val("");
				
		//graph.node().each(function (r) {console.log(r)});
	});

	/* On click of Cancel */
	$('#goBack').click(function(){
		$('#modifynode').css("display", "none");
		$('#menagenode').css("display", "block");

		$('.point').css("fill", "blue");

		if (consideredId != 0){
			var backposition = vis.select('.selected');
			backposition.remove();

			vis.append('circle').attr('id', consideredId)
								.attr('class', 'point')
								.attr('r', 10)
								.attr('cx', graph.node({id: consideredId}).first().x)
								.attr('cy', graph.node({id: consideredId}).first().y);
 		}

 		consideredId = 0;

 		$('#assignedIdOnMod').val("");
		$('#xOnMod').val("");
		$('#yOnMod').val("");
		$('#labelOnMod').val("");
		$('#noteOnMod').val("");
	});

	/* On click on Cancel Manage Node */
	$("#BackToGraphN").click(function(){
		$('#menagenode').css("display", "none");
		$('#create').css("display", "block");

	});


	/* On click of Manage Arch*/
	$("#arch").click(function() {
		$('#create').css("display", "none");
		$('#menagearch').css("display", "block");


	});

	/* On click of New Arch*/
	$("#newarch").click(function() {
		if (graph.node().distinct("id").length > 1) {
			$('#menagearch').css("display", "none");
			$('#addingArch').css("display", "block");

			$('#archId').val(fixArch + varArch);

			$("#selStaNode").unbind('click');
			$("#selStaNode").click(function(){
				var allCircles = vis.selectAll('circle');

				$('.point').css("fill", "green");

				$(allCircles[0]).bind('click', function(){
					px = parseInt(graph.node({id: this.id}).first().x);
					py = parseInt(graph.node({id: this.id}).first().y);
					$("#startnode").val(graph.node({id: this.id}).first().label);
					$(allCircles[0]).unbind('click');
					$('.point').css("fill", "blue");
				});
			});

			$("#selEndNode").unbind('click');
			$("#selEndNode").click(function(){
				var allCircles = vis.selectAll('circle');

				$('.point').css("fill", "green");

				$(allCircles[0]).bind('click', function(){
					dx = parseInt(graph.node({id: this.id}).first().x);
					dy = parseInt(graph.node({id: this.id}).first().y);
					$("#endnode").val(graph.node({id: this.id}).first().label);
					$(allCircles[0]).unbind('click');
					$('.point').css("fill", "blue");
				});
			});

			$("#calLength").unbind('click');
			$("#calLength").click(function(){
				if (($("#startnode").val() != "No node") && ($("#endnode").val() != "No node")) {
					$("#length").val(ArchLength (px, py, dx, dy));

					vis.append("line").attr('id', $('#archId').val())
									  .attr('class', 'createArch')
									  .attr('x1', px)
									  .attr('y1', py)
									  .attr('x2', dx)
									  .attr('y2', dy)
									  .attr('stroke', 'black');
				} else {
					alert("You have to set the strarting and the endig nodes to calculate the lenght of link")
				}
			});


		} else {
			alert("You have to create at least two nodes to create an link");
		}
	});

	/* On click of Save Node in Create New Link */
	$('#savearch').click(function(){
		if (($("#startnode").val() != "No node") && ($("#endnode").val() != "No node") && ($("#length").val() != "Select connected nodes")) {
			$('#addingArch').css("display", "none");
			$('#create').css("display", "block");

			var arId = $('#archId').val();
			var start = $("#startnode").val();
			var end = $("#endnode").val();
			var len = $("#length").val();
			var Anote = $("#notearchs").val();

			vis.select(".createArch").remove();
			vis.append("line").attr('id', arId)
							.attr('class', 'allLine')
							.attr('x1', px)
							.attr('y1', py)
							.attr('x2', dx)
							.attr('y2', dy)
							.attr('stroke', 'black');

			graph.arch.insert({id: arId, start: start, end: end, len: len, note: Anote});
			
			$('#archId').val("");
			$("#startnode").val("No node");
			$("#endnode").val("No node");
			$("#length").val("Select connected nodes");
			$("#notearchs").val("");
			px = 0;
			dx = 0;
			py = 0;
			dy = 0;
			varArch++;

			//graph.arch().each(function (r) {console.log(r)})
		} else {
			alert("You need to insert the connected nodes and calculate the distance between them to save the link");
		}
	});

	/* On click of Cancel on Create New Link */
	$('#goBackNewArch').click(function(){
		$('#addingArch').css("display", "none");
		$('#menagearch').css("display", "block");

		vis.select(".createArch").remove();

		$('#archId').val("");
		$("#startnode").val("No node");
		$("#endnode").val("No node");
		$("#length").val("Select connected nodes");
		$("#notearchs").val("");
		px = 0;
		dx = 0;
		py = 0;
		dy = 0;
	});

	/* On click of Menu Delete Links */
	$('#modarch').click(function(){
		if(graph.arch().distinct("id").length >= 1) {
			$('#menagearch').css("display", "none");
			$('#modifyarchs').css("display", "block");

			vis.selectAll("line").attr('stroke', 'green').attr('stroke-width', '4px');
			var allArch = vis.selectAll("line");

			$(allArch[0]).bind('click', function(){
				consideredArchId = this.id;
				$("#archIdOM").val(consideredArchId);
				$('#startnodeOM').val(graph.arch({id: this.id}).first().start);
				$('#endnodeOM').val(graph.arch({id: this.id}).first().end);
				$('#lengthOM').val(graph.arch({id: this.id}).first().len);
				$('#notearchsOM').val(graph.arch({id: this.id}).first().note);

				allArch.attr('stroke', 'black').attr('stroke-width', '1px');
				d3.select(this).attr("stroke", "red").attr('stroke-width', '3px').attr("class", "selectedArch");
				d3.selectAll('.createArch').attr('stroke', 'black').attr('stroke-width', '1px');
				$(allArch[0]).unbind('click');
			});

		} else {
			alert("There isn't any link to modify")
		}
	});

	/* On click of Effective Delete Link */
	$('#deleteSelArch').click(function(){
		$('#modifyarchs').css("display", "none");
		$('#create').css("display", "block");

		var arId = $('#archIdOM').val();
		
		graph.arch({id: arId}).remove();
		vis.select('.selectedArch').remove();
			
		$('#archIdOM').val("");
		$("#startnodeOM").val("No node");
		$("#endnodeOM").val("No node");
		$("#lengthOM").val("Select connected nodes");
		$("#notearchsOM").val("");

		consideredArchId = 0;
	});

	/* On click of Cancel on Delete Link */
	$('#goBackArch').click(function(){
		$('#modifyarchs').css("display", "none");
		$('#menagearch').css("display", "block");

		$('.allLine').attr('stroke', 'black').attr('stroke-width', '1px');

		if (consideredArchId != 0) {
			vis.select(".selectedArch").remove();
			vis.append("line").attr('id', consideredArchId)
						.attr('class', 'allLine')
						.attr('x1', graph.node({label: graph.arch({id: consideredArchId }).first().start}).first().x )
						.attr('y1', graph.node({label: graph.arch({id: consideredArchId }).first().start}).first().y )
						.attr('x2', graph.node({label: graph.arch({id: consideredArchId }).first().end}).first().x )
						.attr('y2', graph.node({label: graph.arch({id: consideredArchId }).first().end}).first().y )
						.attr('stroke', 'black');

			consideredArchId = 0;

			$('#archIdOM').val("");
			$("#startnodeOM").val("No node");
			$("#endnodeOM").val("No node");
			$("#lengthOM").val("Select connected nodes");
			$("#notearchsOM").val("");
		}
	});

	/* On click on Cancel Manage Links */
	$("#BackToGraphA").click(function(){
		$('#menagearch').css("display", "none");
		$('#create').css("display", "block");

	});

	/* On click of User Interface */
	$("#userinterface").click(function(){
		if (graph.arch().distinct("id").length >= 1) {
			$("#SelInterface").css("display", "none");
			$('#UsingMapForm').css("display", "block");

			var stringForDJ = Map(graph);
				
			dijkstra = new Graph(stringForDJ);

			//console.log(dijkstra.findShortestPath('N1', 'N2'));

			$("#USERselStaNode").unbind('click');
			$("#USERselStaNode").click(function(){
				var allCircles = vis.selectAll('circle');

				$('.point').css("fill", "green");

				$(allCircles[0]).bind('click', function(){
					startpath = graph.node({id: this.id}).first().label;
					$("#USERstartnode").val(graph.node({id: this.id}).first().label);
					$(allCircles[0]).unbind('click');
					$('.point').css("fill", "blue");
				});
			});

			$("#USERselEndNode").unbind('click');
			$("#USERselEndNode").click(function(){
				var allCircles = vis.selectAll('circle');
				$('.point').css("fill", "green");

				$(allCircles[0]).bind('click', function(){
					endpath = graph.node({id: this.id}).first().label;
					$("#USERendnode").val(graph.node({id: this.id}).first().label);
					$(allCircles[0]).unbind('click');
					$('.point').css("fill", "blue");
				});
			});
		} else {
			alert("There is no map to use, create one to enter in this interface.");
		}
	});

	/* On click of Calculate path */
	$("#calculatePath").click(function(){
		if ( $("#USERstartnode").val() != "No node" || $("#USERendnode").val() == "No node" ) {
			var allpath = dijkstra.findShortestPath(startpath, endpath);

			if (allpath != null) {
				
				var distance = 0;

				for (var i = 0; i < allpath.length - 1; i++) {
					for (var j = 0; j < graph.arch().get(0).length; j++) {
						if (((graph.arch().get(0)[j].start == allpath[i]) && (graph.arch().get(0)[j].end == allpath[i + 1])) || 
							((graph.arch().get(0)[j].start == allpath[i + 1]) && (graph.arch().get(0)[j].end == allpath[i])) )  {
							var element = document.getElementById(graph.arch().get(0)[j].id);
							distance += parseInt(graph.arch().get(0)[j].len);
							element.setAttribute("stroke", "red")
							element.setAttribute("stroke-width", "3px");
							break;
						}
					}
				}

				$("#USERlength").val(distance);

			} else {
				alert("There is no path to arrive to the selcted node");
			}
		} else {
			alert("Select the start and the end nodes to calculate the path");
		}
	});	

	/* On click of Cancel on User Div */
	$("#goBackMain").click(function (){
		$("#SelInterface").css("display", "block");
		$('#UsingMapForm').css("display", "none");

		for (var j = 0; j < graph.arch().get(0).length; j++) {
			var element = document.getElementById(graph.arch().get(0)[j].id);
			element.setAttribute("stroke", "black")
			element.setAttribute("stroke-width", "1px");
		}

		$("#USERlength").val("");
		$("#USERendnode").val("No node");
		$("#USERstartnode").val("No node");
		
	});

	/* On click of reset */
	$("#reset").click(function(){
		$("#USERlength").val("");
		$("#USERendnode").val("No node");
		$("#USERstartnode").val("No node");

		for (var j = 0; j < graph.arch().get(0).length; j++) {
			var element = document.getElementById(graph.arch().get(0)[j].id);
			element.setAttribute("stroke", "black")
			element.setAttribute("stroke-width", "1px");
		}
	});
});