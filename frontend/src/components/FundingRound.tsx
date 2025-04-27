import FundingRoundTable from "./FundingRoundTable";

function FundingRound() {
  return (
    <div className="root">
      {/* <h1>Hello, dear future Motherbrain developer! 👋</h1>

      <p>
        This is a code test that is meant to test your creativity and problem
        solving skills.
      </p>

      <p>
        This repository is a barebones setup with a Node backend and a React
        frontend. If you really want to, you can tear it all down and start from
        scratch, but this is meant to get you started immediately.
      </p>

      <h2>The Challenge</h2>

      <p>
        The database for this assignment is an SQLite db that you can find in:
        <pre>backend/prisma/dev.db</pre>A tip is to run{" "}
        <code>npx prisma studio</code> in the <code>backend</code> directory and
        then you will be able to access the database via{" "}
        <a href="http://localhost:5555">http://localhost:5555</a>.
      </p>

      <p>The database contains:</p>

      <ul>
        <li>
          <code>Organization</code> – A table with organizations
        </li>
        <li>
          <code>FundingRound</code> – A table with{" "}
          <a href="https://techcrunch.com/2017/01/08/wtf-is-a-funding-round/">
            funding rounds
          </a>
        </li>
      </ul>

      <p>
        We want you to{" "}
        <strong>
          explore and create a chart or graph of any aspect of the data.
        </strong>{" "}
        Use any charting library you want or whip something up yourself if you
        prefer that. Points for creativity, both in aesthetics and in data
        analysis.
      </p>

      <p style={{ fontWeight: 700 }}>Good Luck!</p>

      <br />

      <h2>Example</h2>

      <p>
        Here is a simple table version of some funding round data. How will <em>you</em> make
        it more fun?
      </p> */}
      <FundingRoundTable />
    </div>
  );
}

export default FundingRound;
