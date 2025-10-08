# demo-ci (Jenkins pass/fail demo)

Tiny npm project to generate **one green build** and **one red build** on demand using `FAIL_BUILD=true`.

## Local quickstart
```bash
./run-pass.sh   # green
./run-fail.sh   # red (tests fail on purpose)
