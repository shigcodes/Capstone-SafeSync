const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;


app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Database connection details
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'SafeSyncDB',
    password: 'P@sspin1102',
    port: 5432,
});

app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows[1]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(`Login attempt with username: ${username} and password: ${password}`);
    try {
        const query = 'SELECT id, username, role FROM users WHERE username = $1 AND password = $2';
        const result = await pool.query(query, [username, password]);
        if (result.rows.length > 0) {
            res.json({ success: true, message: "Login successful", user: result.rows[0] });
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Updated endpoint to handle form submissions in IRF Form
app.post('/records/irf', async (req, res) => {
    const {
        date_time_reported, date_time_incident, type_of_incident, copy_for, place_of_incident,
        family_name, first_name, middle_name, qualifier, nickname, citizenship, gender, civil_status,
        date_of_birth, age, place_of_birth, home_phone, mobile_phone, current_address,
        current_village_sitio, current_barangay, current_town_city, current_province,
        other_address, other_village_sitio, other_barangay, other_town_city, other_province,
        educational_attainment, occupation, id_card_presented, email_address, latitude, longitude,
        narrative_of_incident, name_of_reporter, name_of_arresting_officer, police_officer_details,
        blotter_recorder, desk_officer, blotter_entry_number,
        suspect_family_name, suspect_first_name, suspect_middle_name, suspect_qualifier, suspect_nickname,
        suspect_citizenship, suspect_gender, suspect_civil_status, suspect_date_of_birth, suspect_age,
        suspect_place_of_birth, suspect_home_phone, suspect_mobile_phone, suspect_current_address,
        suspect_current_village_sitio, suspect_current_barangay, suspect_current_town_city, suspect_current_province,
        suspect_other_address, suspect_other_village_sitio, suspect_other_barangay, suspect_other_town_city, suspect_other_province,
        suspect_educational_attainment, suspect_occupation, suspect_work_address, suspect_related_to_victim,
        suspect_email, suspect_is_afp_pnp, suspect_rank, suspect_unit_assignment, suspect_group_affiliation,
        suspect_previous_criminal_record, suspect_previous_criminal_record_details, suspect_status_of_previous_case,
        suspect_height, suspect_weight, suspect_eye_color, suspect_eye_description, suspect_hair_color,
        suspect_hair_description, suspect_under_influence, suspect_under_influence_others, guardian_name,
        guardian_address, guardian_home_phone, guardian_mobile_phone, victim_family_name, victim_first_name,
        victim_middle_name, victim_qualifier, victim_nickname, victim_citizenship, victim_gender,
        victim_civil_status, victim_date_of_birth, victim_age, victim_place_of_birth, victim_home_phone,
        victim_mobile_phone, victim_current_address, victim_current_village_sitio, victim_current_barangay,
        victim_current_town_city, victim_current_province, victim_other_address, victim_other_village_sitio,
        victim_other_barangay, victim_other_town_city, victim_other_province, user_id,reported_by

    } = req.body;

    console.log(req.body);

    try {
        const query = `
            INSERT INTO irf_records (
                date_time_reported, date_time_incident, type_of_incident, copy_for, place_of_incident,
                family_name, first_name, middle_name, qualifier, nickname, citizenship, gender, civil_status,
                date_of_birth, age, place_of_birth, home_phone, mobile_phone, current_address,
                current_village_sitio, current_barangay, current_town_city, current_province,
                other_address, other_village_sitio, other_barangay, other_town_city, other_province,
                educational_attainment, occupation, id_card_presented, email_address, latitude, longitude,
                narrative_of_incident, name_of_reporter, name_of_arresting_officer, police_officer_details,
                blotter_recorder, desk_officer, blotter_entry_number, 
                suspect_family_name, suspect_first_name, suspect_middle_name, suspect_qualifier, suspect_nickname,
                suspect_citizenship, suspect_gender, suspect_civil_status, suspect_date_of_birth, suspect_age,
                suspect_place_of_birth, suspect_home_phone, suspect_mobile_phone, suspect_current_address,
                suspect_current_village_sitio, suspect_current_barangay, suspect_current_town_city, suspect_current_province,
                suspect_other_address, suspect_other_village_sitio, suspect_other_barangay, suspect_other_town_city, suspect_other_province,
                suspect_educational_attainment, suspect_occupation, suspect_work_address, suspect_related_to_victim,
                suspect_email, suspect_is_afp_pnp, suspect_rank, suspect_unit_assignment, suspect_group_affiliation,
                suspect_previous_criminal_record, suspect_previous_criminal_record_details, suspect_status_of_previous_case,
                suspect_height, suspect_weight, suspect_eye_color, suspect_eye_description, suspect_hair_color,
                suspect_hair_description, suspect_under_influence, suspect_under_influence_others, guardian_name,
                guardian_address, guardian_home_phone, guardian_mobile_phone, victim_family_name, victim_first_name,
                victim_middle_name, victim_qualifier, victim_nickname, victim_citizenship, victim_gender,
                victim_civil_status, victim_date_of_birth, victim_age, victim_place_of_birth, victim_home_phone,
                victim_mobile_phone, victim_current_address, victim_current_village_sitio, victim_current_barangay,
                victim_current_town_city, victim_current_province, victim_other_address, victim_other_village_sitio,
                victim_other_barangay, victim_other_town_city, victim_other_province, user_id, reported_by
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
                $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38,
                $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56,
                $57, $58, $59, $60, $61, $62, $63, $64, $65, $66, $67, $68, $69, $70, $71, $72, $73, $74,
                $75, $76, $77, $78, $79, $80, $81, $82, $83, $84, $85, $86, $87, $88, $89, $90, $91, $92,
                $93, $94, $95, $96, $97, $98, $99, $100, $101, $102, $103, $104, $105, $106, $107, $108,
                $109, $110, $111, $112, $113
            )
            RETURNING id, irf_no
        `;

        const values = [
            date_time_reported, date_time_incident, type_of_incident, copy_for, place_of_incident,
            family_name, first_name, middle_name, qualifier, nickname, citizenship, gender, civil_status,
            date_of_birth, age, place_of_birth, home_phone, mobile_phone, current_address,
            current_village_sitio, current_barangay, current_town_city, current_province,
            other_address, other_village_sitio, other_barangay, other_town_city, other_province,
            educational_attainment, occupation, id_card_presented, email_address, latitude, longitude,
            narrative_of_incident, name_of_reporter, name_of_arresting_officer, police_officer_details,
            blotter_recorder, desk_officer, blotter_entry_number,
            suspect_family_name, suspect_first_name, suspect_middle_name, suspect_qualifier, suspect_nickname,
            suspect_citizenship, suspect_gender, suspect_civil_status, suspect_date_of_birth, suspect_age,
            suspect_place_of_birth, suspect_home_phone, suspect_mobile_phone, suspect_current_address,
            suspect_current_village_sitio, suspect_current_barangay, suspect_current_town_city, suspect_current_province,
            suspect_other_address, suspect_other_village_sitio, suspect_other_barangay, suspect_other_town_city, suspect_other_province,
            suspect_educational_attainment, suspect_occupation, suspect_work_address, suspect_related_to_victim,
            suspect_email, suspect_is_afp_pnp, suspect_rank, suspect_unit_assignment, suspect_group_affiliation,
            suspect_previous_criminal_record, suspect_previous_criminal_record_details, suspect_status_of_previous_case,
            suspect_height, suspect_weight, suspect_eye_color, suspect_eye_description, suspect_hair_color,
            suspect_hair_description, suspect_under_influence, suspect_under_influence_others, guardian_name,
            guardian_address, guardian_home_phone, guardian_mobile_phone, victim_family_name, victim_first_name,
            victim_middle_name, victim_qualifier, victim_nickname, victim_citizenship, victim_gender,
            victim_civil_status, victim_date_of_birth, victim_age, victim_place_of_birth, victim_home_phone,
            victim_mobile_phone, victim_current_address, victim_current_village_sitio, victim_current_barangay,
            victim_current_town_city, victim_current_province, victim_other_address, victim_other_village_sitio,
            victim_other_barangay, victim_other_town_city, victim_other_province, user_id, reported_by
        ];

        const result = await pool.query(query, values);
        res.status(201).json({
            message: 'IRF submitted successfully',
            irf_no: result.rows[0].irf_no
        });
    } catch (err) {
        console.error('Error submitting IRF:', err);
        res.status(500).json({
            message: 'Failed to submit IRF',
            error: err.message
        });
    }
});

// Updated endpoint to fetch IRF records in Dashboard
app.get('/records/allirfs', async (req, res) => {
    try {
        const query = `
            SELECT id, irf_no, place_of_incident, 
                   TO_CHAR(date_time_reported, 'YYYY-MM-DD", "HH24:MI:SS') as date_time_reported, 
                   type_of_incident, status, user_id, reported_by
            FROM irf_records
            ORDER BY date_time_reported DESC
        `;
        const result = await pool.query(query);
        console.log(result.rows);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching IRF records:', err);
        res.status(500).json({
            message: 'Failed to fetch IRF records',
            error: err.message
        });
    }
});

// New endpoint to fetch user information by ID using request body
app.post('/user-by-id', async (req, res) => {
    const { id } = req.body; // Get ID from request body
    try {
        const query = 'SELECT id, username, user_type, first_name, last_name, station, role FROM users WHERE id = $1';
        const result = await pool.query(query, [id]);
        if (result.rows.length > 0) {
            console.log(result.rows[0]);
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error('Error fetching user information:', err);
        res.status(500).json({ message: 'Failed to fetch user information', error: err.message });
    }
});

// Updated endpoint to fetch IRF details by irf_no in IRF Details
app.get('/records/irf/:irf_no', async (req, res) => {
    const { irf_no } = req.params;
    try {
        const query = `
            SELECT id, irf_no, place_of_incident, type_of_incident, 
                   TO_CHAR(date_time_incident, 'YYYY-MM-DD", "HH24:MI:SS') as date_time_incident,
                   TO_CHAR(date_time_reported, 'YYYY-MM-DD", "HH24:MI:SS') as date_time_reported,status,
                   narrative_of_incident, name_of_reporter, police_officer_details, blotter_recorder,
                   desk_officer, name_of_arresting_officer, blotter_entry_number,
                   first_name, middle_name, family_name, qualifier, nickname, citizenship, gender, civil_status,
                   date_of_birth, age, place_of_birth, home_phone, mobile_phone, current_address,
                   current_village_sitio, current_barangay, current_town_city, current_province,
                   other_address, other_village_sitio, other_barangay, other_town_city, other_province,
                   educational_attainment, occupation, id_card_presented, email_address, latitude, longitude,
                   suspect_family_name, suspect_first_name, suspect_middle_name, suspect_qualifier, suspect_nickname,
                   suspect_citizenship, suspect_gender, suspect_civil_status, suspect_date_of_birth, suspect_age,
                   suspect_place_of_birth, suspect_home_phone, suspect_mobile_phone, suspect_current_address,
                   suspect_current_village_sitio, suspect_current_barangay, suspect_current_town_city, suspect_current_province,
                   suspect_other_address, suspect_other_village_sitio, suspect_other_barangay, suspect_other_town_city, suspect_other_province,
                   suspect_educational_attainment, suspect_occupation, suspect_work_address, suspect_related_to_victim,
                   suspect_email, suspect_is_afp_pnp, suspect_rank, suspect_unit_assignment, suspect_group_affiliation,
                   suspect_previous_criminal_record, suspect_previous_criminal_record_details, suspect_status_of_previous_case,
                   suspect_height, suspect_weight, suspect_eye_color, suspect_eye_description, suspect_hair_color,
                   suspect_hair_description, suspect_under_influence, suspect_under_influence_others, guardian_name, 
                   guardian_address, guardian_home_phone, guardian_mobile_phone, victim_family_name, victim_first_name, 
                   victim_middle_name, victim_qualifier, victim_nickname, victim_citizenship, victim_gender, 
                   victim_civil_status, victim_date_of_birth, victim_age, victim_place_of_birth, victim_home_phone,
                   victim_mobile_phone, victim_current_address, victim_current_village_sitio, victim_current_barangay,
                   victim_current_town_city, victim_current_province, victim_other_address, victim_other_village_sitio, 
                   victim_other_barangay, victim_other_town_city, victim_other_province,
                   narrative_of_incident, name_of_reporter, name_of_arresting_officer, police_officer_details, blotter_recorder, 
                   desk_officer, blotter_entry_number, status, user_id
            FROM irf_records
            WHERE irf_no = $1
        `;
        const result = await pool.query(query, [irf_no]);
        console.log("query result: ", result.rows[0])
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'IRF not found' });
        }
    } catch (err) {
        console.error('Error fetching IRF details:', err);
        res.status(500).json({
            message: 'Failed to fetch IRF details',
            error: err.message
        });
    }
});

// New endpoint to update IRF status
app.put('/records/irf/:irf_no/status', async (req, res) => {
    const { irf_no } = req.params;
    const { status } = req.body;

    try {
        const query = `
            UPDATE irf_records
            SET status = $1
            WHERE irf_no = $2
            RETURNING irf_no, status
        `;
        const result = await pool.query(query, [status, irf_no]);

        if (result.rows.length > 0) {
            res.json({
                message: 'IRF status updated successfully',
                irf_no: result.rows[0].irf_no,
                status: result.rows[0].status
            });
        } else {
            res.status(404).json({ message: 'IRF not found' });
        }
    } catch (err) {
        console.error('Error updating IRF status:', err);
        res.status(500).json({
            message: 'Failed to update IRF status',
            error: err.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// New endpoint to delete IRF record by id
app.delete('/records/irf/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'DELETE FROM irf_records WHERE id = $1 RETURNING id';
        const result = await pool.query(query, [id]);

        if (result.rows.length > 0) {
            res.json({ message: 'IRF record deleted successfully', id: result.rows[0].id });
        } else {
            res.status(404).json({ message: 'IRF record not found' });
        }
    } catch (err) {
        console.error('Error deleting IRF record:', err);
        res.status(500).json({ message: 'Failed to delete IRF record', error: err.message });
    }
});

// New endpoint to fetch all user data
app.get('/profile', async (req, res) => {
    try {
        const query = 'SELECT id, username, user_type, first_name, last_name, station, role FROM users';
        const result = await pool.query(query);

        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).json({ message: 'Failed to fetch user data', error: err.message });
    }
});

app.get('/roles', async (req, res) => {
    try {
        const query = 'SELECT id, username, user_type, first_name, last_name, station, role FROM users';
        const result = await pool.query(query);

        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).json({ message: 'Failed to fetch user data', error: err.message });
    }
});

app.get('/user-details/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`Received request for user ID: ${id}`);
    try {
        const query = 'SELECT id, username, user_type, first_name, last_name, station, role FROM users WHERE id = $1';
        console.log(`Executing query: ${query} with ID: ${id}`);
        const result = await pool.query(query, [id]);
        console.log(`Query result:`, result.rows);

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            console.log(`No user found for ID: ${id}`);
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).json({ message: 'Failed to fetch user data', error: err.message });
    }
});

// New endpoint to add a user
app.post('/roles', async (req, res) => {
    const { first_name, last_name, username, usertype, station, role, password } = req.body;

    try {
        const query = `
      INSERT INTO users (first_name, last_name, username, user_type, station, role, password)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, first_name, last_name, username, user_type, station, role
    `;
        const values = [first_name, last_name, username, usertype, station, role, password];

        const result = await pool.query(query, values);

        if (result.rows.length > 0) {
            res.status(201).json(result.rows[0]);
        } else {
            res.status(400).json({ message: 'Failed to add user' });
        }
    } catch (err) {
        console.error('Error adding user:', err);
        res.status(500).json({ message: 'Failed to add user', error: err.message });
    }
});

// New endpoint to generate reports
app.post('/reports', async (req, res) => {
    const { incident_types, months, years } = req.body;
    console.log('Received request:', { incident_types, months, years }); // Log received data

    try {
        let query = `
        SELECT 
          type_of_incident, 
          TO_CHAR(date_time_reported, 'Month') AS month,
          EXTRACT(YEAR FROM date_time_reported) AS year,
          COUNT(*) AS count
        FROM irf_records
        WHERE 1=1
      `;

        const queryParams = [];
        let paramCounter = 1;

        if (incident_types && incident_types.length > 0) {
            query += ` AND type_of_incident = ANY($${paramCounter})`;
            queryParams.push(incident_types);
            paramCounter++;
        }

        if (months && months.length > 0) {
            query += ` AND EXTRACT(MONTH FROM date_time_reported) = ANY($${paramCounter})`;
            queryParams.push(months);
            paramCounter++;
        }
        if (years && years.length > 0) {
            query += ` AND EXTRACT(YEAR FROM date_time_reported) = ANY($${paramCounter})`;
            queryParams.push(years);
            paramCounter++;
        }

        query += `
        GROUP BY type_of_incident, TO_CHAR(date_time_reported, 'Month'), EXTRACT(YEAR FROM date_time_reported)
        ORDER BY year, TO_DATE(TO_CHAR(date_time_reported, 'Month'), 'Month'), type_of_incident
      `;

        console.log('Executing query:', query, 'with params:', queryParams); // Log the query and params

        const result = await pool.query(query, queryParams);
        console.log('Query result:', result.rows); // Log the query result

        res.json(result.rows);
    } catch (err) {
        console.error('Error generating report:', err);
        res.status(500).json({ message: 'Failed to generate report', error: err.message });
    }
});

// Update user profile
app.put('/profile', async (req, res) => {
    const { id, first_name, last_name, password } = req.body;
    try {
      const query = `
        UPDATE users
        SET first_name = $1, last_name = $2, password = $3
        WHERE id = $4
        RETURNING id, username, user_type, first_name, last_name, station, role
      `;
      const result = await pool.query(query, [first_name, last_name, password, id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json({ success: true, user: result.rows[0] });
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// New endpoint to fetch user data by username
app.get('/user/:username', async (req, res) => {
    const { username } = req.params;
    console.log(`Received request for username: ${username}`);
    try {
        const query = 'SELECT id, username, user_type, first_name, last_name, station, role FROM users WHERE username = $1';
        console.log(`Executing query: ${query} with username: ${username}`);
        const result = await pool.query(query, [username]);
        console.log(`Query result:`, result.rows);

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            console.log(`No user found for username: ${username}`);
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).json({ message: 'Failed to fetch user data', error: err.message });
    }
});

// New endpoint to update IRF details
app.put('/records/irf/:irf_no', async (req, res) => {
  const { irf_no } = req.params;
  const updatedDetails = req.body;

  try {
    // First, check if the IRF was reported by the main station
    const checkQuery = 'SELECT reported_by FROM irf_records WHERE irf_no = $1';
    const checkResult = await pool.query(checkQuery, [irf_no]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ message: 'IRF not found' });
    }

    const reportedBy = checkResult.rows[0].reported_by;
    if (reportedBy !== 'main_station') {
      return res.status(403).json({ message: 'Only IRFs reported by the main station can be edited' });
    }

    // Prepare the update query
    const updateFields = Object.keys(updatedDetails).map((key, index) => `${key} = $${index + 1}`).join(', ');
    const updateValues = Object.values(updatedDetails);

    const updateQuery = `
      UPDATE irf_records
      SET ${updateFields}
      WHERE irf_no = $${updateValues.length + 1}
      RETURNING *
    `;

    const result = await pool.query(updateQuery, [...updateValues, irf_no]);

    if (result.rows.length > 0) {
      res.json({
        message: 'IRF details updated successfully',
        updatedIRF: result.rows[0]
      });
    } else {
      res.status(404).json({ message: 'IRF not found' });
    }
  } catch (err) {
    console.error('Error updating IRF details:', err);
    res.status(500).json({
      message: 'Failed to update IRF details',
      error: err.message
    });
  }
});


// Updated endpoint to fetch report data for Excel export
app.get('/reports', async (req, res) => {
    try {
        const { incident_types, months, years } = req.query;

        let query = `
            SELECT 
                TO_CHAR(date_time_reported, 'Mon') AS month,
                EXTRACT(YEAR FROM date_time_reported) AS year,
                type_of_incident,
                COUNT(*) AS count
            FROM irf_records
            WHERE 1=1
        `;
        const queryParams = [];
        let paramCounter = 1;

        if (incident_types) {
            const types = incident_types.split(',');
            query += ` AND type_of_incident = ANY($${paramCounter})`;
            queryParams.push(types);
            paramCounter++;
        }

        if (months) {
            const monthNumbers = months.split(',').map(Number);
            query += ` AND EXTRACT(MONTH FROM date_time_reported) = ANY($${paramCounter})`;
            queryParams.push(monthNumbers);
            paramCounter++;
        }

        if (years) {
            const yearNumbers = years.split(',').map(Number);
            query += ` AND EXTRACT(YEAR FROM date_time_reported) = ANY($${paramCounter})`;
            queryParams.push(yearNumbers);
            paramCounter++;
        }

        query += `
            GROUP BY 
                TO_CHAR(date_time_reported, 'Mon'),
                EXTRACT(YEAR FROM date_time_reported),
                type_of_incident
            ORDER BY 
                EXTRACT(YEAR FROM date_time_reported),
                TO_DATE(TO_CHAR(date_time_reported, 'Mon'), 'Mon'),
                type_of_incident
        `;

        const result = await pool.query(query, queryParams);

        // Process the data to match the Excel structure
        const processedData = processDataForExcel(result.rows);

        console.log('Processed data for Excel:', processedData);

        res.json(processedData);
    } catch (error) {
        console.error('Error fetching report data for Excel:', error);
        res.status(500).json({ error: 'Failed to fetch report data for Excel' });
    }
});

function processDataForExcel(rawData) {
    const monthOrder = [
        'JAN', 'FEB', 'MARCH', 'APRIL', 'MAY', 'JUNE',
      'JULY', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'
    ];

    const incidentTypes = {
        'Against Persons': ['Murder', 'Homicide', 'Physical Injury', 'Rape'],
        'Against Property': ['Robbery', 'Theft', 'Carnapping', 'Cattle Rustling']
    };

    const processedData = {};

    rawData.forEach(item => {
        if (!processedData[item.year]) {
            processedData[item.year] = {};
        }
        if (!processedData[item.year][item.month]) {
            processedData[item.year][item.month] = {};
        }
        processedData[item.year][item.month][item.type_of_incident] = parseInt(item.count);
    });

    const excelData = [];

    Object.keys(processedData).sort().forEach(year => {
        monthOrder.forEach(month => {
            if (processedData[year][month]) {
                const rowData = { Month: month, Year: year };
                let againstPersonsTotal = 0;
                let againstPropertyTotal = 0;

                Object.keys(incidentTypes).forEach(category => {
                    incidentTypes[category].forEach(type => {
                        rowData[type] = processedData[year][month][type] || 0;
                        if (category === 'Against Persons') {
                            againstPersonsTotal += rowData[type];
                        } else {
                            againstPropertyTotal += rowData[type];
                        }
                    });
                });

                rowData['Against Persons Total'] = againstPersonsTotal;
                rowData['Against Property Total'] = againstPropertyTotal;
                rowData['Total Index Crimes'] = againstPersonsTotal + againstPropertyTotal;

                excelData.push(rowData);
            }
        });
    });

    return excelData;
}

