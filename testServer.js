const wmc = require('./main')
wmc.on('echo',function(i,echo){return echo})
wmc.create(4000)