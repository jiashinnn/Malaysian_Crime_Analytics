// Form validation script

document.addEventListener('DOMContentLoaded', function() {
    // Get all forms with the 'needs-validation' class
    const forms = document.querySelectorAll('.needs-validation');
    
    // Loop over each form and prevent submission if fields are invalid
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            form.classList.add('was-validated');
        }, false);
    });

    // Category and type relationship
    const categorySelect = document.getElementById('category');
    const typeSelect = document.getElementById('type');
    
    if (categorySelect && typeSelect) {
        // Define types for each category based on the dataset
        const typesByCategory = {
            'assault': [
                'causing_injury',
                'murder',
                'rape',
                'robbery_gang_armed',
                'robbery_gang_unarmed',
                'robbery_solo_armed',
                'robbery_solo_unarmed'
            ],
            'property': [
                'break_in',
                'theft_other',
                'theft_vehicle_lorry',
                'theft_vehicle_motorcar',
                'theft_vehicle_motorcycle'
            ]
        };
        
        // Update types when category changes
        categorySelect.addEventListener('change', function() {
            const category = this.value;
            const types = typesByCategory[category] || [];
            
            // Clear current options
            typeSelect.innerHTML = '';
            
            // Add default option
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.text = 'Select a type';
            defaultOption.disabled = true;
            defaultOption.selected = true;
            typeSelect.appendChild(defaultOption);
            
            // Add options for the selected category
            types.forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                // Format the display text to be more readable
                option.text = type
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase());
                typeSelect.appendChild(option);
            });
        });
    }

    // State and district relationship
    const stateSelect = document.getElementById('state');
    const districtSelect = document.getElementById('district');
    
    if (stateSelect && districtSelect) {
        // Districts by state based on the dataset
        const districtsByState = {
            'Johor': ['Batu Pahat', 'Iskandar Puteri', 'Johor Bahru Selatan', 'Johor Bahru Utara', 'Kluang', 'Kota Tinggi', 'Kulaijaya', 'Ledang', 'Mersing', 'Muar', 'Nusajaya', 'Pontian', 'Segamat', 'Seri Alam'],
            'Kedah': ['Baling', 'Bandar Baharu', 'Kota Setar', 'Kuala Muda', 'Kubang Pasu', 'Kulim', 'Langkawi', 'Padang Terap', 'Pendang', 'Pokok Sena', 'Sik', 'Yan'],
            'Kelantan': ['Bachok', 'Gua Musang', 'Jeli', 'Kota Bharu', 'Kuala Krai', 'Machang', 'Pasir Mas', 'Pasir Puteh', 'Tanah Merah', 'Tumpat'],
            'Melaka': ['Alor Gajah', 'Jasin', 'Melaka Tengah'],
            'Negeri Sembilan': ['Jelebu', 'Jempol', 'Kuala Pilah', 'Port Dickson', 'Rembau', 'Seremban', 'Tampin'],
            'Pahang': ['Bentong', 'Bera', 'Cameron Highlands', 'Jerantut', 'Kuantan', 'Lipis', 'Maran', 'Pekan', 'Raub', 'Rompin', 'Temerloh'],
            'Perak': ['Bagan Datuk', 'Batang Padang', 'Hilir Perak', 'Hulu Perak', 'Kampar', 'Kerian', 'Kinta', 'Kuala Kangsar', 'Larut Matang dan Selama', 'Manjung', 'Muallim', 'Perak Tengah'],
            'Perlis': ['Kangar'],
            'Pulau Pinang': ['Barat Daya', 'Seberang Perai Selatan', 'Seberang Perai Tengah', 'Seberang Perai Utara', 'Timur Laut'],
            'Sabah': ['Beaufort', 'Beluran', 'Keningau', 'Kinabatangan', 'Kota Belud', 'Kota Kinabalu', 'Kota Marudu', 'Kuala Penyu', 'Kudat', 'Kunak', 'Lahad Datu', 'Nabawan', 'Papar', 'Penampang', 'Putatan', 'Ranau', 'Sandakan', 'Semporna', 'Sipitang', 'Tambunan', 'Tawau', 'Telupid', 'Tenom', 'Tongod', 'Tuaran'],
            'Sarawak': ['Asajaya', 'Bau', 'Belaga', 'Betong', 'Bintulu', 'Dalat', 'Daro', 'Julau', 'Kanowit', 'Kapit', 'Kuching', 'Lawas', 'Limbang', 'Lubok Antu', 'Lundu', 'Marudi', 'Matu', 'Miri', 'Mukah', 'Pusa', 'Samarahan', 'Saratok', 'Sarikei', 'Selangau', 'Serian', 'Sibu', 'Simunjan', 'Song', 'Sri Aman', 'Tatau'],
            'Selangor': ['Ampang Jaya', 'Gombak', 'Hulu Langat', 'Hulu Selangor', 'Klang', 'Kuala Langat', 'Kuala Selangor', 'Petaling', 'Sabak Bernam', 'Sepang', 'Shah Alam', 'Sungai Buloh'],
            'Terengganu': ['Besut', 'Dungun', 'Hulu Terengganu', 'Kemaman', 'Kuala Nerus', 'Kuala Terengganu', 'Marang', 'Setiu'],
            'W.P. Kuala Lumpur': ['Brickfields', 'Cheras', 'Dang Wangi', 'Putrajaya', 'Sentul', 'Wangsa Maju']
        };
        
        // Update districts when state changes
        stateSelect.addEventListener('change', function() {
            const state = this.value;
            const districts = districtsByState[state] || [];
            
            // Clear current options
            districtSelect.innerHTML = '';
            
            // Add default option
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.text = 'Select a district';
            defaultOption.disabled = true;
            defaultOption.selected = true;
            districtSelect.appendChild(defaultOption);
            
            // Add options for the selected state
            districts.forEach(district => {
                const option = document.createElement('option');
                option.value = district;
                option.text = district;
                districtSelect.appendChild(option);
            });
        });
    }
}); 