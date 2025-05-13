import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Form,
  Table,
  Container,
  Row,
  Col,
  Card,
  Alert,
  InputGroup
} from 'react-bootstrap';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'Pending',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const filtered = tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [searchTerm, tasks]);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/tasks');
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks.');
    }
  };

  const handleAddTaskClick = () => {
    setShowForm(!showForm);
    setEditingTaskId(null);
    setFormData({ title: '', description: '', dueDate: '', status: 'pending' });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTaskId) {
        await axios.put(`http://localhost:5000/api/tasks/${editingTaskId}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/tasks', formData);
      }
      fetchTasks();
      setShowForm(false);
      setEditingTaskId(null);
      setFormData({ title: '', description: '', dueDate: '', status: 'pending' });
    } catch (err) {
      setError('Error saving task.');
    }
  };

  const handleEdit = (task) => {
    setFormData(task);
    setEditingTaskId(task.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`);
        fetchTasks();
      } catch (err) {
        setError('Error deleting task.');
      }
    }
  };

  return (
    <Container className="my-4">
         <h2 className='text-center mb-5'>Task Manager</h2>
      <Row className="mb-3">
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Filter by task title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputGroup.Text>Search</InputGroup.Text>
            <Button variant="primary" onClick={handleAddTaskClick}>
            {showForm && !editingTaskId ? 'Cancel' : 'Add Task'}
          </Button>
          </InputGroup>
        
      </Row>



      {error && <Alert variant="danger">{error}</Alert>}

      {showForm && (
        <Card className="mb-4">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={3}>
                  <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group controlId="formDueDate">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group controlId="formStatus">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={2} className="d-flex align-items-end">
                  <Button type="submit" variant="success" className="w-100">
                    {editingTaskId ? 'Update' : 'Add'}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      )}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th style={{ width: '140px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No matching tasks found.</td>
            </tr>
          ) : (
            filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                <td>{task.status}</td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </Button>{' '}
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default TaskList;
