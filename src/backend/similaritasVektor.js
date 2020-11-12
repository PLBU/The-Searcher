	// Menghitung nilai cosinus similaritas terhadap Query dengan setiap dokumen yang and
	// inputan:
	// tabelQuery didapat dari return fungsi makeQueryTable
	// matriksSearch merupakan matriks dua dimensi 2XN,  inputan searching yang sudah dibuat menjadi vektor
	
	// Contoh masukan : similaritasMatriks(makeQueryTable(matriksSearch, dataMatriks));
	// Contoh keluaran : [0.8273,0.21333,1,0.333];
	
    var listCosine = new Array(tabelQuery[0].length - 2);
    var rootsqrSearch = 0;
	var rootsqrData = 0;
	// matriksSearch = [["dia",2],["adalah",4],["dedlener",100]];

    for(var i=0; i<tabelQuery[i].length - 2; i++) {
		rootsqrSearch = 0;
		rootsqrData = 0;
		listCosine[i] = 0;
        for(var j=0; j<tabelQuery.length - 1; j++) {
            // tabelQuery[i].length - 2, karena untuk tabelQuery[0], isinya merupakan nama dari data matriks di baris tersebut
            listCosine[i] += tabelQuery[j+1][1] * tabelQuery[j+1][i+2];
            rootsqrSearch += tabelQuery[j+1][1] ** 2;
            rootsqrData += tabelQuery[j+1][i+2] ** 2;
        }
        rootsqrSearch = Math.sqrt(rootsqrSearch);
        rootsqrData = Math.sqrt(rootsqrData);
        listCosine[i] /= (rootsqrSearch * rootsqrData)
    }
    return listCosine;
    // listCosine merupakan array dengan setiap baris merupakan nilai rank setiap baris di dataMatriks, sort dilakukan di fungsi sortRank.
}