const numToFreq=(num)=>{
    return ((num+2)*1000); // adjust 
}
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var oscillatorNode = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();
var frequency = 500; // start frequency
var volume = 0.8;
var years=[2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000,1999,1998,1997,1996,1995,1994,1993,1992,1991,1990,1989,1988,1987,1986,1985,1984,1983,1982,1981,1980,1979,1978,1977,1976,1975,1974,1973,1972,1971,1970,1969,1968,1967,1966,1965,1964,1963,1962,1961,1960,1959,1958,1957,1956,1955,1954,1953,1952,1951,1950,1949,1948,1947,1946,1945,1944,1943,1942,1941,1940,1939,1938,1937,1936,1935,1934,1933,1932,1931,1930,1929,1928,1927,1926,1925,1924,1923,1922,1921,1920,1919,1918,1917,1916,1915,1914,1913,1912,1911,1910,1909,1908,1907,1906,1905,1904,1903,1902,1901,1900,1899,1898,1897,1896,1895,1894,1893,1892,1891,1890,1889,1888,1887,1886,1885,1884,1883,1882,1881,1880];
years=years.reverse();
var pop=[0.93,0.75,0.58,0.53,0.43,0.61,0.59,0.37,0.38,0.51,0.53,0.49,0.52,0.47,0.4,0.23,0.17, 0.53,0.43,0.17,0.22,0.14,0.07,0.07,0.25,0.27,0.08,0.16,0.24,-0.01,-0.11,-0.06,0.12,0,0.02,0.08,0.07,-0.16,-0.04,-0.41,-0.47,-0.42,-0.18,-0.2,-0.56,-0.31,-0.09,-0.38,-0.42,-0.39,-0.49,-0.59,-0.26,-0.27,-0.26,-0.3,-0.27,-0.19,-0.22,-0.59,-0.63,-0.56,-0.27,-0.26,-0.37,-0.55,-0.49,-0.55,-0.56,-0.38,0.16,-0.22,-0.03,-0.04,0.04,-0.18,-0.49,-0.58,-0.41,-0.6,-0.64,-0.64,-0.78,-0.68,-0.55,-0.58,-0.85,-0.76,-0.66,-0.55,-0.69,-0.84,-0.79,-0.81,-0.72,-0.72,-0.66,-0.63,-0.79,-0.86,-0.53,-0.69,-0.95,-0.87,-1.17,-1.11,-1.19,-1.16,-0.92,-0.79,-0.83,-1.12,-0.97,-0.97,-0.68,-0.48,-0.58,-0.78,-0.49,-0.44,-0.68,-0.85,-0.81,-0.82,-0.66,-0.89,-0.47,-0.52,-0.76,-0.64,-0.66,-0.59,-0.45,-0.37,-0.36]
pop=pop.reverse();
var year=1880;                      //Indicate Year to begin with here!
var nPop=pop[years.indexOf(year)]; // setting nPop to the value cooresponding to the beginning year
oscillatorNode.connect(gainNode);
gainNode.connect(audioCtx.destination)
oscillatorNode.start();
oscillatorNode.frequency.value = frequency;
gainNode.gain.value = 0.0; //volume!
document.getElementById("poprun").addEventListener("click",function (){
    gainNode.gain.value = 0.5; //volume!
    var delta=0;
    (function manualLoop() {
        setTimeout(function() {
            if (year<years[years.length-1]) {manualLoop();}
            // restructure to enable gradient increase depending on next step!
            let i=years.indexOf(year);
            if ((i!=-1)&&(year<2014)){
                let lastYear=years[i];
                let nextYear=years[i+1];
                let lastPop=pop[i];
                let nextPop=pop[i+1];
                delta= (nextPop-lastPop)/(nextYear-lastYear);
                   
            }
            nPop+=delta;
            document.getElementById("pop").innerHTML=`world population: ${(nPop/1000000).toFixed(2)} Mio`; // change / to * to strecht effect of frequency
            document.getElementById("year").innerHTML=`Year: ${year}`;
            frequency=numToFreq(nPop);
            oscillatorNode.frequency.value = frequency;
            document.getElementById('frequency').innerHTML = frequency.toFixed(2);
            if (year<2019){
                year++;
            }
            else {
                gainNode.gain.value=0;
                delta=0;
                nPop=pop[-1];
            }
        }, 100) // speed 
    }());

})

