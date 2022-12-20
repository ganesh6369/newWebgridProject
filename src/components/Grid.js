import { useEffect, useState } from "react";
import { FaSearch, FaEllipsisV } from "react-icons/fa";

const itemPerPage = 2;

const Table = (props) => {
  const { columns: tableColumns, data, name } = props;
  const [columns, setColumns] = useState(
    tableColumns.map((item) => ({ ...item, show: true }))
  );
  const [sorted, setSorted] = useState(data);
  const [sortOrders, setSortOrders] = useState({});
  const [editingCol, setEditingCol] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [searchVal, setSearchVal] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [filteredResult, setFilteredResult] = useState([]);
  const [showConfig, setShowConfig] = useState(false);
  const [colConfigPos, setColConfigPos] = useState({ top: 0, left: 0 });

  const [pagination, setPagination] = useState({
    start: 0,
    end: itemPerPage,
  });

  useEffect(() => {
    if (!searchVal) {
      setFilteredResult(sorted);
      return;
    }
    const filtered = sorted.filter((item) =>
      (item.fname || "").toLowerCase().includes(searchVal.toLowerCase())
    );
    setFilteredResult(filtered);
  }, [searchVal, sorted]);

  //sorting
  const sort = (col) => {
    if (col.sort) {
      if (sortOrders[col.key] === "desc" || !sortOrders[col.key]) {
        const afterSort = data.sort((a, b) => col.sort(a, b));
        setSorted(afterSort);
        setSortOrders({ ...sortOrders, [col.key]: "asc" });
      } else {
        const afterSort = data.sort((a, b) => col.sort(b, a));
        setSorted(afterSort);
        setSortOrders({ ...sortOrders, [col.key]: "desc" });
      }
    }
  };
  //editing
  const editCol = (row, col, id) => {
    setEditingCol(col);
    setEditingRow(row);
    setEditingId(id);
  };

  ///
  //search
  const searchChange = (evt) => {
    setSearchVal(evt.target.value);
    gotoPage(1);
  };

  const update = (key, val) => {
    const sortedItemIndex = sorted.findIndex((item) => item.id === editingId);
    const updatedSortedData = [...sorted];
    updatedSortedData[sortedItemIndex][key] = val;
    setSorted(updatedSortedData);
  };

  const onKeyDown = (evt) => {
    if (evt.keyCode === 13) {
      finishEdit();
    }
  };

  const finishEdit = () => {
    setEditingCol(null);
    setEditingRow(null);
    setEditingId(null);
  };

  const gotoPage = (page) => {
    const start = (page - 1) * itemPerPage;
    const end = page * itemPerPage;
    setPagination({ start, end });
  };

  const setPage = (increment) => {
    const start = pagination.start + increment * itemPerPage;
    setPagination({
      start,
      end: pagination.end + increment * itemPerPage,
    });
  };

  const showColumnConfigOptios = (evt) => {
    evt.stopPropagation();
    setShowConfig(true);
    setColConfigPos({
      left: evt.clientX - 150,
      top: evt.clientY + 15,
    });
  };

  const selectAll = ({ target: { checked } }) => {
    const cols = columns.map((item) => ({ ...item, show: checked }));

    setColumns(cols);
  };

  useEffect(() => {
    document.addEventListener("click", () => {
      setShowConfig(false);
    });
    return () => {
      document.removeEventListener("click", () => {});
    };
  });

  return (
    <div>
      <GetColumnSelectionOption
        show={showConfig}
        columns={columns}
        position={colConfigPos}
        setColumns={setColumns}
      />
      <h1>{name}</h1>
      <div className="check-box-toggle">
        <div>
          <label>Select All</label>
          <input type="checkbox" onChange={selectAll} />
        </div>
      </div>

      <div>
        <label>
          <FaSearch />
          <input
            className="search-style"
            type="search"
            value={searchVal}
            onChange={searchChange}
          />
        </label>
      </div>
      <table>
        <thead>
          <tr>
            {columns.map((item) => {
              return (
                <th
                  onClick={() => sort(item)}
                  type="text"
                  name="name"
                  key={item.name}
                  style={{ display: item.show ? "" : "none" }}
                >
                  <div className="flex-justified">
                    {item.header}
                    <FaEllipsisV onClick={showColumnConfigOptios} />
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {(filteredResult || [])
            .slice(pagination.start, pagination.end)
            .map((row, index) => {
              return (
                <tr key={`row-${index}`}>
                  {columns.map((item, i) => {
                    const data = item.render ? item.render(row) : row[item.key];
                    if (editingRow === row.id && editingCol === item.key) {
                      return (
                        <input
                          value={data}
                          onKeyDown={onKeyDown}
                          onBlur={finishEdit}
                          key={`row-${index}-column-${i}`}
                          onChange={(evt) => update(item.key, evt.target.value)}
                          style={{ display: item.show ? "" : "none" }}
                        />
                      );
                    }
                    return (
                      <td
                        onDoubleClick={() => editCol(row.id, item.key, row.id)}
                        key={`row-${index}-column-${i}`}
                        style={{ display: item.show ? "" : "none" }}
                      >
                        {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
      <br />
      <div>
        <button disabled={pagination.start <= 0} onClick={() => setPage(-1)}>
          Previous
        </button>
        <button onClick={() => gotoPage(1)}>1</button>
        ...
        <button
          onClick={() =>
            gotoPage(Math.ceil(filteredResult.length / (2 * itemPerPage)))
          }
        >
          {Math.ceil(filteredResult.length / (2 * itemPerPage))}
        </button>
        ...
        <button
          onClick={() =>
            gotoPage(Math.ceil(filteredResult.length / itemPerPage))
          }
        >
          {Math.ceil(filteredResult.length / itemPerPage)}
        </button>
        <button
          disabled={pagination.end >= filteredResult.length}
          onClick={() => setPage(1)}
        >
          Next
        </button>
        <label>
          Page {pagination.start / itemPerPage + 1} of{" "}
          {Math.ceil(filteredResult.length / itemPerPage)}
        </label>
      </div>
    </div>
  );
};
//Hide & Show
const GetColumnSelectionOption = (props) => {
  const { columns, show, position, setColumns } = props;

  const changeVisibility = (evt, key) => {
    const {
      target: { checked },
    } = evt;
    evt.stopPropagation();
    const colIndex = columns.findIndex((item) => item.key === key);
    const colCopy = [...columns];
    const col = columns[colIndex];
    col.show = checked;
    colCopy[colIndex] = col;
    setColumns(colCopy);
  };

  return (
    <div
      style={{
        position: "absolute",
        left: position.left,
        top: position.top,
        display: show ? "block" : "none",
      }}
      className="column-config"
    >
      {columns.map((item) => {
        return (
          <div>
            <label onClick={(evt) => evt.stopPropagation()}>
              <input
                checked={item.show}
                className="input-check"
                type="checkbox"
                onChange={(evt) => changeVisibility(evt, item.key)}
              />
              <span>{item.header}</span>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Table;
