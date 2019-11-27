const numToFreq=(num)=>{
    return (num/500000);
}
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var oscillatorNode = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();
var frequency = 500;
var volume = 0.8;
var years=[2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000,1999,1998,1997,1996,1995,1994,1993,1992,1991,1990,1989,1988,1987,1986,1985,1984,1983,1982,1981,1980,1979,1978,1977,1976,1975,1974,1973,1972,1971,1970,1969,1968,1967,1966,1965,1964,1963,1962,1961,1960,1959,1958,1957,1956,1955,1954,1953,1952,1951,1927,1900,1850,1804,1760,1700,1600,1500,1400,1200,1100,1000,900,800,700,600,200,-200,-500,-1000,-2000,-3000,-4000,-5000];
years=years.reverse();
var pop=[7713468100,7631091040,7547858925,7464022049,7379797139,7295290765,7210581976,7125828059,7041194301,6956823603,6872767093,6789088686,6705946610,6623517833,6541907027,6461159389,6381185114,6301773188,6222626606,6143493823,6064239055,5984793942,5905045788,5824891951,5744212979,5663150427,5581597546,5498919809,5414289444,5327231061,5237441558,5145426008,5052522147,4960567912,4870921740,4784011621,4699569304,4617386542,4536996762,4458003514,4380506100,4304533501,4229506060,4154666864,4079480606,4003794172,3927780238,3851650245,3775759617,3700437046,3625680627,3551599127,3478769962,3407922630,3339583597,3273978338,3211001009,3150420795,3091843507,3034949748,2979576185,2925686705,2873306090,2822443282,2773019936,2724846741,2677608960,2630861562,2584034261,2000000000,1600000000,1200000000,1000000000,770000000,610000000,500000000,450000000,350000000,360000000,320000000,275000000,240000000,220000000,210000000,200000000,190000000,150000000,100000000,50000000,27000000,14000000,7000000,5000000]
pop=pop.reverse();
console.log(years);
console.log(pop);
var year=1000;
oscillatorNode.connect(gainNode);
gainNode.connect(audioCtx.destination)
oscillatorNode.start();
oscillatorNode.frequency.value = frequency;
gainNode.gain.value = 0.0; //volume!
document.getElementById("poprun").addEventListener("click",function (){
    gainNode.gain.value = 0.5; //volume!
    (function manualLoop() {
        setTimeout(function() {
            manualLoop();         
            // restructure to enable gradient increase depending on next step!
            let i=years.indexOf(year);
            if (i!=-1){
                frequency=numToFreq(pop[i]);
                oscillatorNode.frequency.value = frequency;       
                document.getElementById('frequency').innerHTML = frequency.toFixed(2);
                document.getElementById("pop").innerHTML=`world population: ${pop[i]/1000000} Mio`;
            }
            document.getElementById("year").innerHTML=`Year: ${year}`;
            if (year<2019){
                year++;
            }
            else {
                gainNode.gain.value=0;
            }
        }, 50)
    }());

})
