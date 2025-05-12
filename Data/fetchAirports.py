import csv
import json
import requests

# Download OpenFlights airport data
url = 'https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat'
response = requests.get(url)
response.raise_for_status()

# Parse CSV data with proper encoding
csv_reader = csv.reader(response.text.splitlines())

airports = []
for row in csv_reader:
    # Extract relevant fields with proper indexing
    airport_id = row[0]
    name = row[1].strip('"')
    city = row[2].strip('"')
    country = row[3]
    iata_code = row[4].strip('"')
    
    # Skip entries with missing IATA codes or placeholder '\N'
    if not iata_code or iata_code == '\\N':
        continue
    
    # Handle special cases for city names
    if city == 'New York':
        city = 'New York City'
    
    airports.append({
        "code": iata_code,
        "name": name,
        "city": city
    })

# Generate JSON output with sorting
json_output = json.dumps(airports, indent=2, ensure_ascii=False, sort_keys=True)

# Save to file
with open('airports.json', 'w', encoding='utf-8') as f:
    f.write(json_output)

print(f"Generated {len(airports)} airport entries")
