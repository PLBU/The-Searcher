function sortRank(listCosine, dataMatriks) {
	// Sorting nilai rank tertinggi (paling similar) berdasarkan nilai nilai yang ada di listCosine
	// inputan:
	// listCosine didapat dari return fungsi similaritasMatriks
	// dataMatriks adalah matriks N X M + 1 , N adalah jumlah dokumen yang dibaca, M adalah vektor berdimensi M
	// Catatan : Sort bukan berdasar nama, tapi berdasar presentase.

	// Contoh masukan : sortRanking([0.8273,0.21333,1,0.333],dataMatriks);

	// Isi rank*:
	//	"Nama"			"Presentase"		"Isi"
	//	"Dokumen3"			96			"apapun isi yang ada didalam dokumen 3 ini, masih ada koma atau simbol lainnya AKA belum di stemming"
	//	"Dokumen1"			45			"kalau presentase sama, sorting mungkin bisa random untuk kedua dokumen tersebut"
	//	"Dokumen2"			45			"begitulah."
	
    // dataMatriks dibutuhkan untuk menentukan nama dokumen apa yang memiliki suatu nilai rank tersebut 
    var rank = [];
    var currentHighest = 0;
	var namaCurrentHighest;
	rank[0][0] = "Nama";
	rank[0][1] = "Presentase";
	rank[0][2] = "Isi";

    for (var i = 0; i < listCosine.length; i++) {
        currentHighest = 0;
        for (var j = 0; j < listCosine.length; j++) {
            // Kondisional dimana list cosine memiliki nilai lebih tinggi dari current highest tapi nilainya lebih kecil dari rank yang sudah dimasukkan sebelumnya
            if (listCosine[j] > currentHighest && listCosine[j] < rank[i-1][0]){
                currentHighest = listCosine[j];
                namaCurrentHighest = dataMatriks[j+1][0];
            }
            // Kondisional dimana ada dua dokumen dengan rank yang nilainya sama
            if (listCosine[j] == currentHighest && dataMatriks[j] != rank[i-1][1]){
                currentHighest = listCosine[j];
                namaCurrentHighest = dataMatriks[j+1][0];
            }
        }
        rank[i][1] = currentHighest * 100;
		rank[i][0] = namaCurrentHighest;

		var lokasiFile = '../../doc/' + (dataMatriks[j+1][0]);
		fs.readFile(lokasiFile, function (err, data) {
			if (err) throw err;
			rank[i][2] = data.toString();
		});		
    }
	return rank;
}