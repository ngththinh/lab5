import { Container, Row, Col, Button, Form, FormGroup, FormControl, FormCheck, Table } from 'react-bootstrap'
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [student, setStudent] = useState([
    {
      id: 0,
      name: 'Nguyen Van A',
      code: 'CODE12345',
      status: 'active'
    },
    {
      id: 1,
      name: 'Nguyen Van B',
      code: 'CODE6789',
      status: 'in-active'
    },

  ]);
  const [studentt, setStudentt] = useState({
    name: '',
    code: '',
    status: '',
  });

  const [numberStudents, setNumberStudents] = useState(0);
  const [checkedStudents, setCheckedStudents] = useState([]);

  useEffect(() => {
    setNumberStudents(checkedStudents.length);
  }, [checkedStudents]);

  const handleChange = (e) => {
    let newStudent = {};
    if (e.target.name === 'status') {
      newStudent = {
        ...studentt,
        status: !studentt.status ? e.target.value : '',
      }
    }
    else {
      newStudent = {
        ...studentt,
        [e.target.name]: e.target.value,
      }
    }
    setStudentt(newStudent);
  };

  const handleAdd = () => {
    studentt.id = student.length;
    setStudent(prev => [studentt, ...prev]);
    setStudentt({ name: '', code: '', status: '' });
  };

  const handleDelete = (id) => {
    setStudent(prev => {
      prev = prev.filter((item) => {
        return item.id !== id
      });
      return prev;
    });
    setCheckedStudents(prev => (prev.filter((item) => (item !== id))))
  };

  const handleCheckBox = (id) => {
    setCheckedStudents(prev => {
      if (prev.includes(id)) {
        return prev.filter((item) => (item !== id));
      }
      else {
        return [...prev, id];
      }
    });
  };

  const handleClear = () => {
    setStudent([]);
    setNumberStudents(0);
    setCheckedStudents([]);
  };
  
  return (
    <Container>
      <Row className='mt-5'>
        <Col> <h3>Total Selected Student: {numberStudents}</h3></Col>
        <Col>
          <Button variant='primary' onClick={handleClear}>Clear</Button>
        </Col>
      </Row>
      <Row className='mt-5 '>
          <Form style={{ display: 'flex', flexDirection: 'column' }} />
            <Row>
              <Col className='me-4'>
                <FormGroup className='mb-3'>
                  <FormControl type="text" placeholder='Student Name' name='name' value={studentt.name} onChange={handleChange}>
                  </FormControl>
                </FormGroup>
                <FormGroup className='mb-3'>
                  <FormControl type="text" placeholder='Student Code' name='code' value={studentt.code} onChange={handleChange}>
                  </FormControl>
                </FormGroup>
                <FormCheck type='checkbox' label='Still active' name='status' value='active' checked={studentt.status} onChange={handleChange} />
              </Col>
              <Col><Button variant='primary' onClick={handleAdd}>Add</Button></Col>
            </Row>
          <Form />
      </Row>
      <Row className='mt-5'>
        <Table hover size="">
          <thead>
            <tr>
              <th>Select</th>
              <th>Student Name</th>
              <th>Student Code</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              student.map((student) => {
                return (
                  <tr key={student.id} >
                    <td>
                      <Form.Check
                        type='checkbox'
                        checked={checkedStudents.includes(student.id)}
                        onChange={() => handleCheckBox(student.id)}
                      />
                    </td>
                    <td>{student.name}</td>
                    <td>{student.code}</td>
                    <td>
                      {student.status !== 'active' ? (<Button variant='danger' disabled>In-Active</Button>) : (<Button variant='primary' disabled>Active</Button>)}
                    </td>
                    <td>
                      <Button variant='danger' onClick={() => handleDelete(student.id)}>Delete</Button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default App;
