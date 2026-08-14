import UserMenu from "./UserMenu";
import SavedButton from "./SavedButton";

const DashboardActions = ({
  name,
  email,
  initials,
  savedCount,
  isSavedActive,
  onSavedClick,
  onLogout,
}) => {
  return (
    <div className="hidden items-center gap-4 lg:flex">

      <SavedButton
        count={savedCount}
        active={isSavedActive}
        onClick={onSavedClick}
      />

      <UserMenu
        name={name}
        email={email}
        initials={initials}
        onLogout={onLogout}
      />

    </div>
  );
};

export default DashboardActions;