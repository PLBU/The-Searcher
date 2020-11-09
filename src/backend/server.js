//Modules
const express = require('express')
const fs = require('fs')
const lancasterStemmer = require('lancaster-stemmer')
const cors = require('cors')

//Constants
const server = express()
const port = 5000

//Enabling all CORS Requests
server.use(cors() )

//Starting the server
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

//Endpoints Example
//Variable" global

// Untuk menampung isi document dalam string
var docString;

// Untuk menampung isi document dalam array, sudah di stem
var docArray;

// Tabel
var dataMatriks = [["Nama"]];
//Baris pertama(dataMatriks[0]) berisi kata-kata yang merupakan isi document
//Kolom Pertama(dataMatriks[_][0]) adalah nama dari file untuk semua baris selain baris pertama
//Baris pertama kolom pertama berisi "Nama"
//Semua kata sudah di stemming

// Contoh Bentuknya: 
// "Nama", "kata1", "kata2"
// "dokumen2", 5, 2 jika dokumen2 5 ada 1 kata1 dan 2 kata2
// "dokumen1", 3, 4 jika dokumen1 2 ada 3 kata1 dan 4kata2
// Urutan nama dokumen tidak sesuai dengan isi nama2files

//StopWords
var stopwords = ["a","able","about","above","abroad","according","accordingly","across","actually","adj","after","afterwards","again","against","ago","ahead","ain't","all","allow","allows","almost","alone","along","alongside","already","also","although","always","am","amid","amidst","among","amongst","an","and","another","any","anybody","anyhow","anyone","anything","anyway","anyways","anywhere","apart","appear","appreciate","appropriate","are","aren't","around","as","a's","aside","ask","asking","associated","at","available","away","awfully","b","back","backward","backwards","be","became","because","become","becomes","becoming","been","before","beforehand","begin","behind","being","believe","below","beside","besides","best","better","between","beyond","both","brief","but","by","c","came","can","cannot","cant","can't","caption","cause","causes","certain","certainly","changes","clearly","c'mon","co","co.","com","come","comes","concerning","consequently","consider","considering","contain","containing","contains","corresponding","could","couldn't","course","c's","currently","d","dare","daren't","definitely","described","despite","did","didn't","different","directly","do","does","doesn't","doing","done","don't","down","downwards","during","e","each","edu","eg","eight","eighty","either","else","elsewhere","end","ending","enough","entirely","especially","et","etc","even","ever","evermore","every","everybody","everyone","everything","everywhere","ex","exactly","example","except","f","fairly","far","farther","few","fewer","fifth","first","five","followed","following","follows","for","forever","former","formerly","forth","forward","found","four","from","further","furthermore","g","get","gets","getting","given","gives","go","goes","going","gone","got","gotten","greetings","h","had","hadn't","half","happens","hardly","has","hasn't","have","haven't","having","he","he'd","he'll","hello","help","hence","her","here","hereafter","hereby","herein","here's","hereupon","hers","herself","he's","hi","him","himself","his","hither","hopefully","how","howbeit","however","hundred","i","i'd","ie","if","ignored","i'll","i'm","immediate","in","inasmuch","inc","inc.","indeed","indicate","indicated","indicates","inner","inside","insofar","instead","into","inward","is","isn't","it","it'd","it'll","its","it's","itself","i've","j","just","k","keep","keeps","kept","know","known","knows","l","last","lately","later","latter","latterly","least","less","lest","let","let's","like","liked","likely","likewise","little","look","looking","looks","low","lower","ltd","m","made","mainly","make","makes","many","may","maybe","mayn't","me","mean","meantime","meanwhile","merely","might","mightn't","mine","minus","miss","more","moreover","most","mostly","mr","mrs","much","must","mustn't","my","myself","n","name","namely","nd","near","nearly","necessary","need","needn't","needs","neither","never","neverf","neverless","nevertheless","new","next","nine","ninety","no","nobody","non","none","nonetheless","noone","no-one","nor","normally","not","nothing","notwithstanding","novel","now","nowhere","o","obviously","of","off","often","oh","ok","okay","old","on","once","one","ones","one's","only","onto","opposite","or","other","others","otherwise","ought","oughtn't","our","ours","ourselves","out","outside","over","overall","own","p","particular","particularly","past","per","perhaps","placed","please","plus","possible","presumably","probably","provided","provides","q","que","quite","qv","r","rather","rd","re","really","reasonably","recent","recently","regarding","regardless","regards","relatively","respectively","right","round","s","said","same","saw","say","saying","says","second","secondly","see","seeing","seem","seemed","seeming","seems","seen","self","selves","sensible","sent","serious","seriously","seven","several","shall","shan't","she","she'd","she'll","she's","should","shouldn't","since","six","so","some","somebody","someday","somehow","someone","something","sometime","sometimes","somewhat","somewhere","soon","sorry","specified","specify","specifying","still","sub","such","sup","sure","t","take","taken","taking","tell","tends","th","than","thank","thanks","thanx","that","that'll","thats","that's","that've","the","their","theirs","them","themselves","then","thence","there","thereafter","thereby","there'd","therefore","therein","there'll","there're","theres","there's","thereupon","there've","these","they","they'd","they'll","they're","they've","thing","things","think","third","thirty","this","thorough","thoroughly","those","though","three","through","throughout","thru","thus","till","to","together","too","took","toward","towards","tried","tries","truly","try","trying","t's","twice","two","u","un","under","underneath","undoing","unfortunately","unless","unlike","unlikely","until","unto","up","upon","upwards","us","use","used","useful","uses","using","usually","v","value","various","versus","very","via","viz","vs","w","want","wants","was","wasn't","way","we","we'd","welcome","well","we'll","went","were","we're","weren't","we've","what","whatever","what'll","what's","what've","when","whence","whenever","where","whereafter","whereas","whereby","wherein","where's","whereupon","wherever","whether","which","whichever","while","whilst","whither","who","who'd","whoever","whole","who'll","whom","whomever","who's","whose","why","will","willing","wish","with","within","without","wonder","won't","would","wouldn't","x","y","yes","yet","you","you'd","you'll","your","you're","yours","yourself","yourselves","you've","z","zero"];

//Array yang isinya nama-nama dokumen, kalau mau ada dokumen baru tinggal tambah di sini
var nama2files = ["contoh.txt", "contoh2.txt", "contoh3.txt", "contoh4.txt", "banyak1.txt", "banyak2.txt"];

//Counter untuk proses, karena function" bersifat async
var sudahMasukMatriks = 0;

//Program utama
bacaSemuaFile();

function bacaSemuaFile()
{
	//Awal Program, memanggil readTxt yang bertugas untuk membaca file
	// *File dibaca di proses di waktu yang berbeda-beda, urutan dokumen dataMatriks tidak sesuai urutan nama2files*
	for (var i = 0; i < nama2files.length; i++) {
		readTxt(nama2files[i]);
	}

	//Menunggu 3 detik untuk mengecek bila matriks siap
	setTimeout(checkMatriksSiap,3000);
}

function checkMatriksSiap()
{
	if (sudahMasukMatriks == nama2files.length) 
	{
		console.log("Matriks sudah siap");
		/* Untuk Debugging*/
		// console.log(dataMatriks);


		exports.dataMatriks = dataMatriks;
		//Export dataMatriks agar bisa dipakai keluar
		//Cara akses dari luar server.js (contoh di main.js), dengan main.js di directory yang sama dengan server.js
		//var dariServerJs = require('./server.js')
		//var dataDokumen = dariServerJs.dataMatriks
	}
}


function readTxt(namaFile)
{
	// Terima nama file, cari di folder doc, lalu simpan di docstring,
	// remove stopword dan stemming, simpan di docArray
	// Lalu proses di afterReadTxt (karena asyncronous function)
	var lokasiFile = '../../doc/' + namaFile;
	fs.readFile(lokasiFile, function (err, data) {
	    if (err) throw err;
	    docString = data.toString();
	    /* Untuk Debugging*/
	    // console.log(docString);
	    docArray = remove_stopwords(docString);
	    afterReadTxt(namaFile);
	});
}

function afterReadTxt(namaFile)
{
	//Doc array sudah berisi kata" hasil stemming

	//brsMatriks adalah index baris dimana file ini disimpan
	var brsMatriks = dataMatriks.length;

	//Inisialisasi
	dataMatriks[brsMatriks] = [namaFile];
	for (var i = 1; i < dataMatriks[0].length; i++) {
		dataMatriks[brsMatriks][i] = 0;
	}
	masukTabel(docArray, brsMatriks);
	/* Untuk Debugging*/
	// console.log(docArray);
	// console.log(dataMatriks); 
	
	sudahMasukMatriks += 1;
}

function remove_stopwords(str) {
	//remove stopwrod dan stemming
    var result = [];
    var words = str.split(' ');
    for(var i=0;i<words.length;i++) {
       var word_clean = words[i].split(",").join(".").split("!").join(".").split(".").join("")
       var word_clean2 = lancasterStemmer(word_clean)
       if(!stopwords.includes(word_clean)) {
           result.push(word_clean2)
       }
    }
    return(result)
}  

function masukTabel(arr, brsMatriks)
{
	//Masukkan data dari arr, yang akan diberi input docArray, ke dataMatriks
	for (var i = 0; i < arr.length; i++) {
		var idx = dataMatriks[0].indexOf(arr[i]);
		/* Untuk Debugging*/
		//console.log("break 1: "+idx)
		if (idx >= 0) //if item di array docArray ada di dalam dataMatriks[0], idx adalah index ditemukannya kata di dataMAtriks[0]
		{
			dataMatriks[brsMatriks][idx] += 1;
		}
		else
		{
			idx = dataMatriks[0].push(arr[i]) - 1;
			/* Untuk Debugging*/
			//console.log("break 2: "+idx)
			for (var j = 1; j < dataMatriks.length - 1; j++) {
				dataMatriks[j][idx] = 0;
			}
			dataMatriks[brsMatriks][idx] = 1;
		}
	}
}