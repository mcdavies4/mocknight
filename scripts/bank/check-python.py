"""Runs every Python snippet in the PCE bank and checks the expected output.
Usage: npx tsx -e 'import {PY} from "./scripts/bank/tech"; console.log(JSON.stringify(PY))' > /tmp/py.json && python3 scripts/bank/check-python.py /tmp/py.json"""
import contextlib, io, json, sys
bad = 0
for topic, code, out, distractors, _ in json.load(open(sys.argv[1])):
    buf = io.StringIO()
    try:
        with contextlib.redirect_stdout(buf):
            exec(code, {})
        got = buf.getvalue().strip()
    except Exception as ex:
        got = f"EXC {type(ex).__name__}"
    if got != out or out in distractors:
        bad += 1
        print("MISMATCH", repr(code), "expected", repr(out), "got", repr(got))
print("bad =", bad)
sys.exit(1 if bad else 0)
