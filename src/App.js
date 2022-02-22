import { Button, Card, TextField, List, Dialog, Divider } from '@mui/material';
import { useState } from 'react';
import './App.css';

function App() {
    const [input, setInput] = useState('')
    const [showError, setShowError] = useState(false)
    const [result, setResult] = useState({
        maximum: 0,
        minimum: 0,
        unique: [],
        odds: [],
        ordered: []
    })

    const onSubmit = (e) => {
        e.preventDefault();

        if (!valid(input)) {
            setShowError(true)
            return
        }

        let arr = JSON.parse(`[${input}]`).map(Number)

        setResult({
            maximum: Math.max(...arr),
            minimum: Math.min(...arr),
            unique: [... new Set(arr)],
            odds: arr.filter(item => item % 2),
            ordered: arr.sort((a, b) => b - a)
        })
    }

    const valid = (input) => {
        const regex = /^(\d+\s*,\s*)*\d+$/m

        return regex.test(input.replace(/\n/g,' ').trim())
    }

    const handleChange = e => setInput(e.target.value)

    const numToListItem = num => <strong><span className="List">{ num }</span></strong>

    return (
        <div className="App">
            <Card
                variant="outlined"
                className="Card"
            >
                <form onSubmit={ onSubmit } className="Form">
                    <TextField
                        id="numbers"
                        label="Numbers"
                        variant="outlined"
                        multiline
                        placeholder="1,2,..."
                        value={ input }
                        onChange={ handleChange }
                    />

                    <Button variant="outlined" type="submit" className="SubmitButton">
                        Submit
                    </Button>
                </form>
            </Card>

            <Card
                variant="outlined"
                className="Card"
            >
                <List>
                    <p>
                        Maximum: <strong>{ result.maximum }</strong>
                    </p>
                    <Divider />
                    <p>
                        Minimum: <strong>{ result.minimum }</strong>
                    </p>
                    <Divider />
                    <p>
                        Distinct: { result.unique.map(numToListItem) }
                    </p>
                    <Divider />
                    <p>
                        Odds: { result.odds.map(numToListItem) }
                    </p>
                    <Divider />
                    <p>
                        Ordered: { result.ordered.map(numToListItem) }
                    </p>
                </List>
            </Card>

            <Dialog
                open={showError}
                onClose={() => setShowError(false)}
            >
                <Card
                    variant="outlined"
                    className="Card"
                >
                    Input incorrecto
                </Card>
            </Dialog>
        </div>
    )
}

export default App;
