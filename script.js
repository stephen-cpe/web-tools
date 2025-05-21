// Luxon validation
if (typeof luxon === 'undefined') {
    console.error('Luxon failed to load. Please check internet connection.');
    alert('Luxon failed to load. Please check your internet connection and reload.');
}

// Navigation
['clocks', 'sorter', 'tree'].forEach(name => {
    document.getElementById('tab-'+name).addEventListener('click', () => {
        document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
        document.getElementById('tab-'+name).classList.add('active');
        document.querySelectorAll('.tool-section').forEach(s => s.classList.remove('active'));
        document.getElementById('section-'+name).classList.add('active');
    });
});

// Clocks Initialization
function initClocks() {
    const coreTZ = Object.keys(timezoneAliases);
    const initTZ = ["America/New_York","America/Chicago","America/Denver","America/Los_Angeles","Asia/Manila","Europe/London"];
    const grid = document.getElementById('clockGrid');
    
    function createTile(tz) {
        const div = document.createElement('div'); 
        div.className='clockTile';
        
        const sel = document.createElement('select'); 
        sel.className='timezoneSelect';
        
        coreTZ.forEach(v => {
            let o = document.createElement('option'); 
            o.value = v; 
            o.text = timezoneAliases[v]; 
            if(v === tz) o.selected = true; 
            sel.add(o); 
        });
        
        const timeD = document.createElement('div'); 
        timeD.className='timeDisplay';
        
        const dateD = document.createElement('div'); 
        dateD.className='dateDisplay';
        
        const nameD = document.createElement('div'); 
        nameD.className='timezoneName';
        
        div.append(sel, timeD, dateD, nameD); 
        grid.append(div);
        
        sel.onchange = () => update(div);
        update(div);
    }
    
    function update(div) {
        const tz = div.querySelector('select').value;
        const now = new Date();
        div.querySelector('.timeDisplay').textContent = now.toLocaleTimeString('en-US',{timeZone:tz,hour12:false});
        div.querySelector('.dateDisplay').textContent = now.toLocaleDateString('en-US',{timeZone:tz,weekday:'short',month:'short',day:'numeric'});
        div.querySelector('.timezoneName').textContent = timezoneAliases[tz];
    }
    
    setInterval(() => document.querySelectorAll('.clockTile').forEach(update), 1000);
    initTZ.forEach(createTile);
}
initClocks();